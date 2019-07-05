/*点击loginsubmit按钮获取 
用户名loginname 
密码nloginpwd 
的值并传到后台
拖拽验证
登陆成功跳转到上一页，把用户名存到Cookie
返回上一页
新增功能：
保留十天免登陆
 */
function login() {
    $('#loginsubmit').on('click', function () {
        let name =  $('#loginname').val();
        let pwd = $('#nloginpwd').val();
        $.ajax({
            type: 'post',
            data: 'name=' + name + '&pwd=' + pwd,
            url: '../api/login.php',
            //async: false,
            success: function (str) {
                setcookie(name);
            }
        });
    });
}
//保存cookie 10天
function setcookie(name){
    $.cookie('uid', name, {expires: 10});    
}
function name(params) {
    
}

