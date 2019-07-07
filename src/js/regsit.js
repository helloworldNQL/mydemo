function reg(){
    //手机号验证失去焦点验证
    $('#form-phone').blur(function(){
        let reg = /^1[3-9]\d{9}$/;
        if(reg.test($('#form-phone').val())){
            $('.error').hide();
        } else{
            console.log('aa');
            $('.error').show().html('<i class="i-error"></i>请输入手机号')
        }
    })
}