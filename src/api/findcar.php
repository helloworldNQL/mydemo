<?php
//接收数据
include 'conn.php';

$uname = isset($_POST['uname']) ? $_POST['uname'] : '';
$sname = isset($_POST['sname']) ? $_POST['sname'] : '';
//查询店铺 select distinct shopname from cars WHERE dUname = 'anan';
//查询店铺商品 SELECT * FROM goodslist LEFT JOIN cars on goodslist.gId=cars.goodsid WHERE dUname='anan' AND shopname='华天钟表海外专营店';


//查询店铺
$sql = "select distinct shopname from cars WHERE dUname = '$uname'";
$res = $conn->query($sql);
$content = $res->fetch_all(MYSQLI_ASSOC);
//查询店铺商品
$sql2 = "SELECT * FROM goodslist LEFT JOIN cars on goodslist.gId=cars.goodsid WHERE dUname='$uname' AND shopname='$sname'";
$res2 = $conn->query($sql2);
$content2 = $res2->fetch_all(MYSQLI_ASSOC);
$data = array(
    'data' => $content,
    'goods'=>$content2
);
echo json_encode($data, JSON_UNESCAPED_UNICODE);
?>