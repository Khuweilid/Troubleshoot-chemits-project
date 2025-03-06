<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Include the database connection
require_once('../lib/php-connection.php');

// Get the request method
$method = $_SERVER['REQUEST_METHOD'];

// Get the endpoint from the URL
$endpoint = isset($_GET['endpoint']) ? $_GET['endpoint'] : '';

// Handle different endpoints
switch ($endpoint) {
    case 'users':
        handleUsers($conn, $method);
        break;
    case 'devices':
        handleDevices($conn, $method);
        break;
    case 'articles':
        handleArticles($conn, $method);
        break;
    default:
        echo json_encode(['error' => 'Invalid endpoint']);
        break;
}

// Handle users endpoint
function handleUsers($conn, $method) {
    if ($method === 'GET') {
        // Get all users or a specific user
        if (isset($_GET['email'])) {
            $email = $_GET['email'];
            $sql = "SELECT * FROM users WHERE email = '$email'";
        } else {
            $sql = "SELECT * FROM users";
        }
        
        $result = $conn->query($sql);
        
        if ($result->num_rows > 0) {
            $users = [];
            while ($row = $result->fetch_assoc()) {
                // Don't include password in the response
                unset($row['password']);
                $users[] = $row;
            }
            echo json_encode($users);
        } else {
            echo json_encode([]);
        }
    } else if ($method === 'POST') {
        // Handle login or user creation
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (isset($data['email']) && isset($data['password'])) {
            $email = $data['email'];
            $password = $data['password'];
            
            $sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
            $result = $conn->query($sql);
            
            if ($result->num_rows > 0) {
                $user = $result->fetch_assoc();
                // Don't include password in the response
                unset($user['password']);
                echo json_encode($user);
            } else {
                echo json_encode(['error' => 'Invalid credentials']);
            }
        } else {
            echo json_encode(['error' => 'Missing email or password']);
        }
    }
}

// Handle devices endpoint
function handleDevices($conn, $method) {
    if ($method === 'GET') {
        $sql = "SELECT * FROM network_devices";
        $result = $conn->query($sql);
        
        if ($result && $result->num_rows > 0) {
            $devices = [];
            while ($row = $result->fetch_assoc()) {
                $devices[] = $row;
            }
            echo json_encode($devices);
        } else {
            echo json_encode([]);
        }
    }
}

// Handle articles endpoint
function handleArticles($conn, $method) {
    if ($method === 'GET') {
        $sql = "SELECT * FROM knowledge_articles";
        $result = $conn->query($sql);
        
        if ($result && $result->num_rows > 0) {
            $articles = [];
            while ($row = $result->fetch_assoc()) {
                $articles[] = $row;
            }
            echo json_encode($articles);
        } else {
            echo json_encode([]);
        }
    }
}

// Close the database connection
$conn->close();
?>