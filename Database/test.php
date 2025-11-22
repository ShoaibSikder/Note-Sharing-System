<?php
require_once "db_connect.php";

if ($conn->connect_error) {
    die("Connection failed: ".$conn->connect_error);
} else {
    echo "DB connected successfully!";
}
?>
