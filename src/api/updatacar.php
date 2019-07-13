<?php
    include 'conn.php';
    //添加购物车
    //传入商品id,用户cid，数量 sname
    $gid = isset($_POST['id']) ? $_POST['id'] : '';
    $num = isset($_POST['num']) ? $_POST['num'] : '';
    $uname = isset($_POST['uname']) ? $_POST['uname'] : '';
    $sname = isset($_POST['sname']) ? $_POST['sname'] : '';
    //查询购物车是否含有该商品
    $sql = "SELECT * FROM cars WHERE goodsid = '$gid' AND dUname='$uname'";
    $res = $conn->query($sql);
    $row = $res->fetch_all(MYSQLI_ASSOC);
    // var_dump($row);
    if($row){
        //购物车已经存在，则改变原有数量
        $sql2 = "UPDATE cars SET dnum=$num WHERE goodsid = '$gid' AND dUname='$uname';";
        $res2 = $conn->query($sql2);
    }else{
        //不存在，插入一条新的商品信息 //dUname用户名 goodsid商品id shopname 店名 dnum 数量
        $sql2 = "INSERT INTO cars(dUname,goodsid,shopname,dnum)VALUES('$uname','$gid','$sname','1')";
        $res2 = $conn->query($sql2);
    }
    
    if($res2){
        echo 0;
    }else{
        echo 1;
    }
?>