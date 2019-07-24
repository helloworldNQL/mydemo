function reg() {
    let reg = /^1[3-9]\d{9}$/;
    //手机号验证失去焦点验证
    $('#form-phone').blur(function () {
        if (reg.test($('#form-phone').val())) {
            $('.error').hide();
        } else {
            $('.error').show().html('<i class="i-error"></i>请输入手机号')
        }
    });
    $('.form-item-getcode').click(function () {
        if (reg.test($('#form-phone').val())) {
            $('#mpanel').show();
            pic();
        }
        else {
            $('.error').show().html('<i class="i-error"></i>请输入手机号')
        }
    })
}
let tel = null;
function pic() {
    jigsaw.init(document.getElementById('mpanel'), function () {
        $('#mpanel').empty();
        $('.item-getcode-wrap').hide();
        $('.item-phonecode-wrap').show();
        //验证成功自动发送短信验证120s后可重新获取
        dao();
        infpass();

    }, function () {
        $('#mpanel').empty();
        pic();
    });
}
$('#getPhoneCode').click(function(){
    dao();
    infpass();
});
function infpass(){
    $.ajax({
        type: "post",
        data: {
            userphone: $('#form-phone').val()//换成你的号码即可
        },
        url: "../api/duanxin.php",
        async: true,
        success: function (str) {
            //返回验证码
            console.log(str);
            let arr =JSON.parse(str);
            telCode(arr.phonecode);
            console.log(arr.phonecode);
        }
    });
}
//验证验证码
function telCode(code) {
    //验证码正确才可以点击下一步
    $('#step1-next').click(function () {
        // console.log(code);
        if ($('#phoneCode').val() == code) {
            $('#step1-wrap').hide();
            $('#step2-wrap').show();
            $('.person-pro-line1').css('background-position-y', -130);
            $('.person-pro-step2').find('.step-index').css({ 'background-position-x': 0, 'color': '#fff' });
            tel = $('#form-phone').val();
        } else {
            console.log(code);
            alert('您的验证码不正确,请重新输入');
            $('#step1-wrap').show();
            $('#step2-wrap').hide();  
        }
    });
}
//填写信息
let user = false;
let pwd = false;
let agin = false;
let eml = false;
usr();
pwdInf();
equal();
email();
//用户名正则验证 
function usr() {
    $('#form-account').blur(function () {
        let reg = /^[\u4e00-\u9fa5a-zA-Z0-9_\-]{4,20}$/;
        if (reg.test($('#form-account').val())) {
            user = true;
            $('#form-item-account').next().html('');
        } else {
            user = false
            $('#form-item-account').next().html('请输入中文、英文、数字、“-”、“_”的组合，4-20个字符').css('color', 'red');
        }

    });
}
// 密码验证
function pwdInf() {
    //密码强度正则验证建议使用两种或两种以上字符组合 一级纯数字 二级数字英文字母 三级数字字母特殊  
    $('#form-pwd').blur(function () {
        let reg1 = /^\d{6,20}$/;
        //一级判断
        if (reg1.test($('#form-pwd').val())) {
            pwd = true;
            $('.form-item1').next().html('密码强度为弱').css('color', 'red');
        } else {
            //二级判断
            let reg2 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
            if (reg2.test($('#form-pwd').val())) {
                pwd = true;
                $('.form-item1').next().html('密码强度为中').css('color', 'blue');
            } else {
                //三级判断
                let reg3 = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,20}$/;
                if (reg3.test($('#form-pwd').val())) {
                    pwd = true;
                    $('.form-item1').next().html('密码强度为强').css('color', 'green');
                } else {
                    pwd = false
                    $('.form-item1').next().html('请输入6-20个字符不能纯英文').css('color', 'red');
                }
            }
        }
    });
}
//确认密码验证
function equal() {
    $('#form-equalTopwd').blur(function () {
        if ($('#form-equalTopwd').val() == $('#form-pwd').val()) {
            agin = true;
            $('.form-item2').next().html('');
            $('#form-pwd').blur(function () {
                if ($('#form-equalTopwd').val() == $('#form-pwd').val()) {
                    agin = true;
                    $('.form-item2').next().html('')
                } else {
                    agin = false;
                    $('.form-item2').next().html('两次密码不一致,请重新输入').css('color', 'red');
                }
            });
        } else {
            agin = false;
            $('.form-item2').next().html('两次密码不一致,请重新输入').css('color', 'red');
        }

    });
}
//邮箱正则验证 
function email() {
    $('#form-email').blur(function () {
        let reg = /^\w+([\-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (reg.test($('#form-email').val())) {
            eml = true;
            $('.form-item3').next().html('');
        } else {
            eml = false;
            $('.form-item3').next().html('邮箱格式不正确').css('color', 'red');
        }
    });
}
//点击注册
$('#form-register').click(function () {
    if (user && pwd && agin && eml) {
        console.log(tel);
        $.ajax({
            type: 'post',
            url: '../api/reg2.php',
            data: 'username=' + $('#form-account').val() + '&pwd=' + $('#form-pwd').val() + '&tel=' + tel + '&email=' + $('#form-email').val(),
            success: function (str) {
                // console.log(str);
                let arr = JSON.parse(str);
                console.log(arr);
            }
        });
        $('#step2-wrap').hide();
        $('#step3-wrap').show();
        $('.person-pro-line2').css('background-position-y', -130);
        $('.person-pro-step3').find('.step-index').css({ 'background-position-x': 0, 'color': '#fff' });
    } else {
        alert('请完善正确的信息');
    }
});
function dao(){
    let num =120;
    function settime() {
        num--;
        //console.log(num);
        if (num < 0) {
            $('#getPhoneCode').html('重新发送验证码');
            //关闭定时器
            clearInterval(timer);
            //设置按钮恢复点击
            $('#getPhoneCode').attr('disabled',false);
        } else {
            $('#getPhoneCode').html(num + '秒再获取');
            //设置按钮不可点击
            $('#getPhoneCode').attr('disabled',true);
        }
    }
    let timer = setInterval(settime, 1000);
}

