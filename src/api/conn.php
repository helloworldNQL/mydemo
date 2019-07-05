<?php
    header('Content-type:text/html;charset=utf-8');//防止中文乱码

    //文件名不能写con,因为con是系统文件，不能用这个名字做文件名

    //连接数据库
    $severname = 'localhost';//或者写：http://127.0.0.1
    $username = 'root';
    $psw = '';
    $dbname = 'mydemo';

    //通过构造函数 mysqli()建立连接
    $conn = new mysqli($severname,$username,$psw,$dbname);

    //js调用对象的属性和方法：用.    arr.length  arr.sort()
    //php调用对象的属性和方法：->  $conn->connect_error

    if($conn->connect_error) {
        die('连接错误：'.$conn->connect_error);
    }

    // echo '连接成功';

    
?>