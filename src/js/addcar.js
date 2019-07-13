function addcar(num) {
    //判断是否处于登录状态，登录状态才可以加入购物车
    if ($.cookie('uid') == 'null') {
        $('.nologin').show();
        $('#succeed').hide();
        $('.login-btn').click(function () {
            $.cookie('url', location.href, { expires: 1 });
        });
    } else {
        $('.w').hide();
        $('#succeed').show();
        //数据渲染
        let url = location.search;
        //字符串转对象
        let data = strToObj(decodeURI(url));
        console.log(data);
        num = num || 1;
        $('.p-name a').html(data.name);
        $('.p-img img').attr({ src: data.img, alt: data.name });
        let add = new Promise(function (resolve) {
            $.ajax({
                type: 'post',
                url: '../api/addToCart.php',
                data: 'id=' + data.id + '&uname=' + $.cookie('uid') + '&num=' + num + '&sname=' + data.sname,
                success: function (str) {
                    // let arr = JSON.parse(str);
                    // console.log(str)
                    // resolve(str);
                    // console.log(arr.pages1);
                }
            });
        });
        // add.then(function (data) {

        //     console.log(data);
        // })
    }
    //点击登录按钮保存url跳转到登录页
}