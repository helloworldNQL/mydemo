<?php
//接收数据
include 'conn.php';
$sql = "SELECT * FROM category WHERE parent_id BETWEEN 0 AND 11";
$res = $conn->query($sql);
$content = $res->fetch_all(MYSQLI_ASSOC);
$data = array(
    'data' => $content,
);
echo json_encode($data, JSON_UNESCAPED_UNICODE);
?>