<?php

    //接收前端传过来的用户名，查询数据库看是否存在，返回提示信息

    $name = isset($_POST['name']) ? $_POST['name'] : '';//可以在这里写一个默认值，用于测试接口，用完没问题就删掉
    $pwd = isset($_POST['pwd']) ? $_POST['pwd'] : '';
    // echo $name;

    include 'conn.php';//连接数据库

    //写sql语句
    $sql = "SELECT * FROM users WHERE uname = '$name' AND pwd = '$pwd'";//出现变量的时候，用双引号更方便拼接字符串

    //执行sql语句
    $res = $conn->query($sql);

    //得到结果集
    // var_dump($res);

    //获取结果集的num_rows属性，如果大于0证明查询到结果：不给注册
    if($res->num_rows) {
        //真：存在，
        echo 'yes';
    }else {
        echo 'no';
    }

    //关闭数据库
    $res->close();
    $conn->close();
?>