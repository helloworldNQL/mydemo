<?php
    header("content-type:text/html;charset=utf-8"); 
//  include 'common.php';
    //传入的手机号
    $userphone = isset($_POST['userphone']) ? $_POST['userphone']:'';

	$num = rand(100000,999999); //生成4位数的随机验证码

    $url = "http://v.juhe.cn/sms/send";//接口
	$params = array(//3f41131f1e46a8ea793f26b5f147ebf5 172114
	    'key'   => '', //您申请的APPKEY
	    'mobile'    => $userphone, //接受短信的用户手机号码
	    'tpl_id'    => '', //您申请的短信模板ID，根据实际情况修改
	    'tpl_value' =>'#code#='.$num.'&#company#=聚合数据' //您设置的模板变量，根据实际情况修改
	);

	$paramstring = http_build_query($params);
	$content = juheCurl($url, $paramstring);
	$result = json_decode($content, true);
	if ($result) {
	    $datalist = array(
	            'phonecode' => $num,
	            'message' => $result
	        );
	    echo json_encode($datalist,JSON_UNESCAPED_UNICODE);
	} else {
	    //请求异常
	}
	function juheCurl($url, $params = false, $ispost = 0)
	{
	    $httpInfo = array();
	    $ch = curl_init();
	
	    curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
	    curl_setopt($ch, CURLOPT_USERAGENT, 'JuheData');
	    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 60);
	    curl_setopt($ch, CURLOPT_TIMEOUT, 60);
	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
	    if ($ispost) {
	        curl_setopt($ch, CURLOPT_POST, true);
	        curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
	        curl_setopt($ch, CURLOPT_URL, $url);
	    } else {
	        if ($params) {
	            curl_setopt($ch, CURLOPT_URL, $url.'?'.$params);
	             } else {
	            curl_setopt($ch, CURLOPT_URL, $url);
	        }
	    }
	    $response = curl_exec($ch);
	    if ($response === FALSE) {
	        //echo "cURL Error: " . curl_error($ch);
	        return false;
	    }
	    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	    $httpInfo = array_merge($httpInfo, curl_getinfo($ch));
	    curl_close($ch);
	    return $response;
	} 

?>