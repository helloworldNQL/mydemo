function setcookie() {
    $('.link-user').click(function () {
        $.cookie('url', location.href, { expires: 1 });
    });
    if ($.cookie('uid') == 'null') {
        $('.link-user').html('你好，请登录');
        $('.link-logout').hide();
        $('.nologin-tip').show();
    } else {
        $('.link-user').html($.cookie('uid'));
        $('.link-logout').show();
        $('.nologin-tip').hide();
    }
    $('.link-logout').click(function () {
        $.cookie('uid', null);
        setcookie();
    });
}
