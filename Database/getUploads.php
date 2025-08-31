<?php
// getUploads.php
header("Content-Type: application/json");
include 'db.php'; // your database connection

// default values
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 20;
$offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;
$search = isset($_GET['search']) ? "%" . $_GET['search'] . "%" : null;
$status = isset($_GET['status']) ? $_GET['status'] : 'approved'; // default only approved
$mine = isset($_GET['mine']) ? (bool)$_GET['mine'] : false;
$user_id = isset($_GET['user_id']) ? (int)$_GET['user_id'] : null;

try {
    $sql = "
        SELECT u.upload_id, u.title, u.subject, u.file_path, u.status, u.uploaded_at,
               usr.full_name AS uploader, usr.institute,
               COUNT(d.download_id) AS downloads
        FROM uploads u
        JOIN users usr ON u.user_id = usr.user_id
        LEFT JOIN downloads d ON u.upload_id = d.upload_id
        WHERE 1=1
    ";

    $params = [];

    // filter status
    if ($status) {
        $sql .= " AND u.status = ?";
        $params[] = $status;
    }

    // search filter
    if ($search) {
        $sql .= " AND (u.title LIKE ? OR u.subject LIKE ?)";
        $params[] = $search;
        $params[] = $search;
    }

    // only my uploads
    if ($mine && $user_id) {
        $sql .= " AND u.user_id = ?";
        $params[] = $user_id;
    }

    $sql .= " GROUP BY u.upload_id
              ORDER BY u.uploaded_at DESC
              LIMIT ? OFFSET ?";

    $params[] = $limit;
    $params[] = $offset;

    $stmt = $conn->prepare($sql);
    $stmt->execute($params);
    $uploads = [];
    while ($row = $stmt->fetch()) {
        $uploads[] = $row;
    }

    echo json_encode(["success" => true, "uploads" => $uploads]);

} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>
