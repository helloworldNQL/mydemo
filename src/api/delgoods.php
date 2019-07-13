<?php
//接收数据
include 'conn.php';

$uname = isset($_POST['uname']) ? $_POST['uname'] : '';
$gid = isset($_POST['id']) ? $_POST['id'] : '';
//查询店铺 select distinct shopname from cars WHERE dUname = 'anan';
//查询店铺商品 SELECT * FROM goodslist LEFT JOIN cars on goodslist.gId=cars.goodsid WHERE dUname='anan' AND shopname='华天钟表海外专营店';


//删除用户商品
$sql = "DELETE FROM  cars  WHERE dUname='$uname' AND goodsid=$gid";
$res = $conn->query($sql);
//echo $res; 删除成功 true 失败 false
$data = array(
    'data' => $res,
);
echo json_encode($data, JSON_UNESCAPED_UNICODE);
$conn->close();
?>
