<?php
//接收数据
include 'conn.php';
//导航栏二级渲染
$category = isset($_POST['category']) ? $_POST['category'] : '';
$desc = isset($_POST['desc']) ? $_POST['desc'] : '';
//分页
$page = isset($_POST['page']) ? $_POST['page'] : '';//页数，哪一页
$num = isset($_POST['num']) ?$_POST['num'] : '';//一页数据有8条
$index = ($page - 1) * $num;
$sql = "SELECT * FROM goodslist WHERE category = '$category' LIMIT $index,$num";
$res = $conn->query($sql);
$content = $res->fetch_all(MYSQLI_ASSOC);

//销量排序
$sql3 ="SELECT * FROM goodslist WHERE category='$category' ORDER BY sales DESC  LIMIT $index,$num";
$res3 = $conn->query($sql3);
$content3 = $res3->fetch_all(MYSQLI_ASSOC);
/* //升降序
$sql4 ="SELECT * FROM goodslist WHERE category='$category' ORDER BY gNowPrice $desc";
$res4 = $conn->query($sql4);
$content4 = $res4->fetch_all(MYSQLI_ASSOC);
//价格区间
$min = isset($_POST['min']) ? $_POST['min'] : '';
$max = isset($_POST['max']) ? $_POST['max'] : '';
$sql5 ="SELECT * FROM goodslist WHERE category='$category' AND gNowPrice BETWEEN '$min' AND '$max'";
$res5 = $conn->query($sql5);
$content5 = $res5->fetch_all(MYSQLI_ASSOC);
//模糊查询
$keyword = isset($_POST['keyword']) ? $_POST['keyword'] : '';
$sql6 ="SELECT * FROM goodslist WHERE category='$category' AND gName LIKE '%$keyword%'";
$res6 = $conn->query($sql6);
$content6 = $res6->fetch_all(MYSQLI_ASSOC); */
//查询总条数
$sql7 = "SELECT * FROM goodslist WHERE category = '$category'";
$res7 = $conn->query($sql7);
$data = array(
    //'pages' => $res2->num_rows,条数
    //'data' => $content,//综合

   'sales' => $content3,//销量
/*     'pri' => $content4,//价格升降
    'chose'=> $content5,//价格区间
    'find' => $content6,//模糊查找 */
    'pages1' => $res7->num_rows,//总条数
/*     'pages2' => $res5->num_rows,//价格区间总条数
    'pages3' => $res6->num_rows,//模糊查找总条数 */
);
echo json_encode($data, JSON_UNESCAPED_UNICODE);
?>