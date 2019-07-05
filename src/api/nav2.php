<?php
//接收数据
include 'conn.php';
//导航栏二级渲染
$pid = isset($_POST['pid']) ? $_POST['pid'] : '';
$sql = "SELECT * FROM category WHERE parent_id = $pid";
$res = $conn->query($sql);
$content = $res->fetch_all(MYSQLI_ASSOC);
$data = array(
    'data' => $content,
);
echo json_encode($data, JSON_UNESCAPED_UNICODE);
?>