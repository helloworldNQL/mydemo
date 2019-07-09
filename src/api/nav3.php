<?php
//接收数据
include 'conn.php';
//导航栏二级渲染
$pid = isset($_POST['pid']) ? $_POST['pid'] : '';
$sql = "SELECT * FROM category2 WHERE parent_id = $pid";
$sql2 = "SELECT * FROM category2 WHERE id = $pid";
$res = $conn->query($sql);
$res2 = $conn->query($sql2);
$content = $res->fetch_all(MYSQLI_ASSOC);
$content2 = $res2->fetch_all(MYSQLI_ASSOC);
$data = array(
    'data' => $content,
    'img' => $content2
);
echo json_encode($data, JSON_UNESCAPED_UNICODE);
?>