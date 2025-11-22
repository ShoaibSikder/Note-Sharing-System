<?php
header("Content-Type: application/json");
include 'db_connect.php';

$mine = isset($_GET['mine']) ? true : false;
$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : null;

try {
    if ($mine && $user_id) {
        $stmt = $conn->prepare("SELECT u.upload_id, u.title, u.subject, u.file_path, u.uploaded_at, COUNT(d.download_id) AS downloads
                                FROM uploads u
                                LEFT JOIN downloads d ON u.upload_id = d.upload_id
                                WHERE u.id = ?
                                GROUP BY u.upload_id
                                ORDER BY u.uploaded_at DESC");
        $stmt->bind_param("i", $user_id);
    } else {
        $stmt = $conn->prepare("SELECT u.upload_id, u.title, u.subject, u.file_path, u.uploaded_at, COUNT(d.download_id) AS downloads
                                FROM uploads u
                                LEFT JOIN downloads d ON u.upload_id = d.upload_id
                                GROUP BY u.upload_id
                                ORDER BY u.uploaded_at DESC");
    }

    $stmt->execute();
    $result = $stmt->get_result();
    $uploads = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode(["success" => true, "uploads" => $uploads]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>
