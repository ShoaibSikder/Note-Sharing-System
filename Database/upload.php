<?php
session_start();
include 'db_connect.php';

if (!isset($_SESSION['user_id'])) {
    die("Not logged in.");
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST['title'];
    $subject = $_POST['subject'];
    $user_id = $_SESSION['user_id'];

    $target_dir = "uploads/";
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true); // create folder if not exists
    }

    $file_name = time() . "_" . basename($_FILES["file"]["name"]); // unique name
    $target_file = $target_dir . $file_name;

    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        $sql = "INSERT INTO uploads (user_id, title, subject, file_path) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("isss", $user_id, $title, $subject, $target_file);

        if ($stmt->execute()) {
            echo "success";
        } else {
            echo "error: " . $stmt->error;
        }
    } else {
        echo "Upload failed.";
    }
}
?>
