<?php
session_start();
include 'db_connect.php';

if (!isset($_SESSION['user_id'])) {
    die("Not logged in.");
}

if (isset($_GET['file_id'])) {
    $file_id = intval($_GET['file_id']);
    $user_id = $_SESSION['user_id'];

    // Find file
    $sql = "SELECT * FROM uploads WHERE upload_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $file_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $file = $result->fetch_assoc();
        $file_path = $file['file_path'];

        if (file_exists($file_path)) {
            // Save download record
            $sql = "INSERT INTO downloads (upload_id, user_id) VALUES (?, ?)";
            $stmt2 = $conn->prepare($sql);
            $stmt2->bind_param("ii", $file_id, $user_id);
            $stmt2->execute();

            // Force download
            header('Content-Description: File Transfer');
            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment; filename="' . basename($file_path) . '"');
            header('Content-Length: ' . filesize($file_path));
            readfile($file_path);
            exit;
        } else {
            echo "File not found.";
        }
    } else {
        echo "Invalid file.";
    }
}
?>
