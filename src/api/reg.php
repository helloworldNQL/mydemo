<?php

    //接收到前端传过来的用户名和密码，存到用户信息表里面，注册功能

    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $pwd = isset($_POST['pwd']) ? $_POST['pwd'] : '';

    include 'conn.php';//连接数据库

    //sql语句
    $sql = "INSERT INTO userinf(name,pwd) VALUES('$name','$pwd')";

    //执行sql语句
    $res = $conn->query($sql);//得到布尔值

    /* if($res) {
        echo 'yes';//插入成功
    }else {
        echo 'no';//插入失败
    } */


?>