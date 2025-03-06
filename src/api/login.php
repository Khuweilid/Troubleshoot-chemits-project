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
if (!isset($data['email']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing email or password']);
    exit();
}

// Database connection
require_once('../lib/php-connection.php');

// Special case for admin user with hardcoded credentials
if ($data['email'] === 'admin@example.com' && $data['password'] === 'password') {
    $userData = [
        'id' => 1,
        'name' => 'Tech Chemist',
        'email' => 'admin@example.com',
        'role' => 'admin'
    ];
    
    echo json_encode(['user' => $userData]);
    exit();
}

// Get user from database
$stmt = $conn->prepare('SELECT id, name, email, password, role FROM users WHERE email = ?');
$stmt->bind_param('s', $data['email']);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(401); // Unauthorized
    echo json_encode(['error' => 'Invalid email or password']);
    exit();
}

$user = $result->fetch_assoc();

// Verify password
$hashedPassword = hash('sha256', $data['password']);

if ($hashedPassword === $user['password']) {
    // Return user data without password
    $userData = [
        'id' => $user['id'],
        'name' => $user['name'],
        'email' => $user['email'],
        'role' => $user['role']
    ];
    
    echo json_encode(['user' => $userData]);
} else {
    http_response_code(401); // Unauthorized
    echo json_encode(['error' => 'Invalid email or password']);
}

$stmt->close();
$conn->close();
