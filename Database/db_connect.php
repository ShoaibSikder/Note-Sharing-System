<?php
$host = "localhost";      // Database host
$user = "root";           // MySQL username
$pass = "";               // MySQL password
$db   = "note_sharing_system"; // Database name

$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}
?>
