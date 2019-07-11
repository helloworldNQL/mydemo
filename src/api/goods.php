<?php
//接收数据
include 'conn.php';
//导航栏二级渲染
//查询单个商品
$id = isset($_POST['id']) ? $_POST['id'] : '';
$sql = "SELECT * FROM goodslist WHERE gId = '$id'";
$res = $conn->query($sql);
$content = $res->fetch_all(MYSQLI_ASSOC);
$data = array(
    'data' => $content,
);
echo json_encode($data, JSON_UNESCAPED_UNICODE);