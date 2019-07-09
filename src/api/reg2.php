<?php 
    //接收到前端传过来的用户名和密码，存到用户信息表里面，注册功能

    $name = isset($_POST['username']) ? $_POST['username'] : '';
    $pwd = isset($_POST['pwd']) ? $_POST['pwd'] : '';
    $tel = isset($_POST['tel']) ? $_POST['tel'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';

    include 'conn.php';//连接数据库

    //sql语句
    $sql = "INSERT INTO users(uname,pwd,tel,email,upower) VALUES('$name','$pwd','$tel','$email','user')";
    //执行sql语句
    $res = $conn->query($sql);//得到布尔值
    if($res) {
        echo 'yes';//插入成功
    }else {
        echo 'no';//插入失败
    }
