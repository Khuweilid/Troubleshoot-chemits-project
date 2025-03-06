<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

// Database connection
require_once('../lib/php-connection.php');

// Get all users (excluding passwords)
$stmt = $conn->prepare('SELECT id, name, email, role, created_at, updated_at FROM users');
$stmt->execute();
$result = $stmt->get_result();

$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode(['users' => $users]);

$stmt->close();
$conn->close();
