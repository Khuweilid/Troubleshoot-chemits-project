<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// For preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get JSON data from request body
$data = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (!isset($data['name']) || !isset($data['email']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit();
}

// Database connection
require_once('../lib/php-connection.php');

// Check if user already exists
$stmt = $conn->prepare('SELECT id FROM users WHERE email = ?');
$stmt->bind_param('s', $data['email']);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    http_response_code(409); // Conflict
    echo json_encode(['error' => 'User with this email already exists']);
    exit();
}

// Hash password
$hashedPassword = hash('sha256', $data['password']);

// Insert new user
$stmt = $conn->prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)');
$role = 'user';
$stmt->bind_param('ssss', $data['name'], $data['email'], $hashedPassword, $role);

if ($stmt->execute()) {
    $userId = $stmt->insert_id;
    
    // Return user data without password
    $userData = [
        'id' => $userId,
        'name' => $data['name'],
        'email' => $data['email'],
        'role' => $role
    ];
    
    http_response_code(201); // Created
    echo json_encode(['user' => $userData]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to register user: ' . $conn->error]);
}

$stmt->close();
$conn->close();
