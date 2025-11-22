<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

require_once "db_connect.php";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['code'=>405,'message'=>'Method not allowed']);
    exit;
}

// Get form data
$fullname  = trim($_POST['fullname'] ?? '');
$institute = trim($_POST['institute'] ?? '');
$email     = trim($_POST['email'] ?? '');
$password  = trim($_POST['password'] ?? '');

// Validate
if (!$fullname || !$institute || !$email || !$password) {
    http_response_code(400);
    echo json_encode(['code'=>400,'message'=>'All fields are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['code'=>422,'message'=>'Invalid email']);
    exit;
}

// Check if email exists
$stmt = $conn->prepare("SELECT id FROM users WHERE email=?");
$stmt->bind_param("s",$email);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    http_response_code(409);
    echo json_encode(['code'=>409,'message'=>'Email already registered']);
    exit;
}
$stmt->close();

// Hash password
$hash = password_hash($password,PASSWORD_DEFAULT);

// Insert user
$stmt = $conn->prepare("INSERT INTO users (fullname,institute,email,password) VALUES (?,?,?,?)");
$stmt->bind_param("ssss",$fullname,$institute,$email,$hash);

if ($stmt->execute()) {
    http_response_code(200);
    echo json_encode(['message'=>'Registration successful']);
} else {
    http_response_code(500);
    echo json_encode(['code'=>500,'message'=>'Database insertion failed: '.$stmt->error]);
}

$stmt->close();
$conn->close();
?>
