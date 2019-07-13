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
    //账号登录
    $('.login-tab-r').on('click', function () {
        $('.login-tab-r a').css({ 'color': '#e4393c', 'font-weight': 700 });
        $('.login-tab-l a').css({ 'color': '#666', 'font-weight': 'normal' });
        $('.login-box').show();
        $('.qrcode-login').hide();

        $('#loginsubmit').on('click', function () {
            let name = $('#loginname').val();
            let pwd = $('#nloginpwd').val();
            $.ajax({
                type: 'post',
                data: 'name=' + name + '&pwd=' + pwd,
                url: '../api/login.php',
                //async: false,
                success: function (str) {
                    if (str == 'yes') {
                        let url = $.cookie('url');
                        if (url) {
                            //拿到就跳转到上一页
                            location.href = url;
                        } else {
                            location.href = '../inde.html';
                        }
                        setcookie(name);
                    } else {
                        $('.msg-error').css('display', 'block').html('<b></b>账户名与密码不匹配，请重新输入');
                    }
                }
            });
        });
    })
    //扫描登录
    $('.login-tab-l').on('click', function () {
        $('.login-tab-l a').css({ 'color': '#e4393c', 'font-weight': 700 });
        $('.login-tab-r a').css({ 'color': '#666', 'font-weight': 'normal' });
        $('.qrcode-login').show();
        $('.login-box').hide();
    })

    //
}
//保存cookie 10天bi
function setcookie(name) {
    $.cookie('uid', name, { expires: 10 });
}


