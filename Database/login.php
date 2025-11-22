<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

require_once "db_connect.php";

$email = $_GET['email'] ?? '';
$password = $_GET['password'] ?? '';

if (!$email || !$password) {
    echo json_encode(['success'=>false,'message'=>'Please enter both email and password']);
    exit;
}

$stmt = $conn->prepare("SELECT password FROM users WHERE email=?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    echo json_encode(['success'=>false,'message'=>'Invalid email or password']);
    exit;
}

$stmt->bind_result($hashed_password);
$stmt->fetch();
$stmt->close();

if (!password_verify($password, $hashed_password)) {
    echo json_encode(['success'=>false,'message'=>'Invalid email or password']);
    exit;
}

echo json_encode(['success'=>true,'message'=>'Login successful']);
exit;
