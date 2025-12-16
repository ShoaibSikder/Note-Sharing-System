<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

// Secure session settings
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'secure' => false, // change to true if using HTTPS
    'httponly' => true,
    'samesite' => 'Strict'
]);

session_start();

require_once "db_connect.php";
require_once "cipher.php";

$email = $_GET['email'] ?? '';
$password = $_GET['password'] ?? '';

if (!$email || !$password) {
    echo json_encode(['success'=>false,'message'=>'Please enter both email and password']);
    exit;
}

// Find user
$stmt = $conn->prepare("SELECT id, fullname, password FROM users WHERE email=?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    echo json_encode(['success'=>false,'message'=>'Invalid email or password']);
    exit;
}

$stmt->bind_result($id, $fullname, $hashed_password);
$stmt->fetch();
$stmt->close();

// Encrypt login password same way as registration
$encrypted_pass = caesar_encrypt($password, 5);

// Verify
if (!password_verify($encrypted_pass, $hashed_password)) {
    echo json_encode(['success'=>false,'message'=>'Invalid email or password']);
    exit;
}

// Regenerate session ID
session_regenerate_id(true);

// Set session variables
$_SESSION['id'] = $id;
$_SESSION['fullname'] = $fullname;
$_SESSION['logged_in'] = true;

echo json_encode([
    'success' => true,
    'message' => 'Login successful',
    'user_id' => $id,
    'fullname' => $fullname
]);
exit;
?>
