<?php
session_start();
include 'db_connect.php';

header('Content-Type: application/json'); // Important

if (!isset($_SESSION['id'])) {
    echo json_encode(["success" => false, "message" => "Not logged in."]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST['title'];
    $subject = $_POST['subject'];
    $user_id = $_SESSION['id'];

    $target_dir = "uploads/";
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true);
    }

    $file_name = time() . "_" . basename($_FILES["file"]["name"]);
    $target_file = $target_dir . $file_name;

    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        $sql = "INSERT INTO uploads (id, title, subject, file_path) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("isss", $user_id, $title, $subject, $target_file);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "File uploaded successfully!"]);
        } else {
            echo json_encode(["success" => false, "message" => "DB error: " . $stmt->error]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Upload failed."]);
    }
}
?>
