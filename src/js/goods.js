function gShow() {
    let url = location.search;
    //字符串转对象
    let gid = strToObj(decodeURI(url));
    let init = new Promise(function (resolve) {
        $.ajax({
            type: 'post',
            url: '../api/goods.php',
            data: 'id=' + gid.id,
            success: function (str) {
                let arr = JSON.parse(str);
                console.log(arr);
                resolve(arr.data);
            }
        });
    });
    init.then(function (data) {
        console.log(data[0]);
        $('.sku-name').html(data[0].gName);
        $('.J-p-41495598491').html(data[0].gNowPrice);
        $('.shopName a').html(data[0].gshop);
        //图片
        let img = data[0].img.split(',');
        let str = img.map(function (item) {
            return `<li>
                        <div class="small-img">
                            <img src="${item}" />
                        </div>
                    </li>`
        }).join('');
        $('.magnifier-line ul').html(str);
        goods();
        //颜色
        let col = data[0].color.split(',');
        let color = col.map(function (item) {
            return `<div class="item  " data-sku="41495598488" data-value="AR1908">
                    <b></b>
                    <a href="#none" clstag="shangpin|keycount|product|yanse-AR1908_oversea">
                        <img data-img="1"
                            src="${item}"
                        width="40" height="40" alt="AR1908"><i>AR1908</i>
                    </a>
                    </div>`
        }).join('');
        $('#choose-attr-1 .dd').html(color);
        console.log(data[0].gId);//addcar.html?id=${item.gId}&img=${img[0]}&name=${item.gName}
        $('#InitCartUrl').attr( 'href' ,'addcar.html?id='+ data[0].gId + '&img=' + img[0] + '&name=' + data[0].gName + '&sname=' + data[0].gshop);
    });
}
//加入购物车
$('#InitCartUrl').click(function () {
    //商品id 用户名uname 数量 num
    // console.log($('#buy-num').val());
    addcar($('#buy-num').val());
});
let num = $('#buy-num').val();
$('#buy-num').blur(function(){
    if ($('#buy-num').val() >= 20) {
        $('#buy-num').val(20);
    }else if ($('#buy-num').val() <= 0) {
        $('#buy-num').val(1);
    }
})
$('.btn-add').click(function () {
    num++;
    if (num >= 20) {
        num = 20
    }
    $('#buy-num').val(num);
});
$('.btn-reduce').click(function () {
    num--;
    if (num <= 0) {
        num = 1;
    }
    $('#buy-num').val(num);
});
//放大镜
function goods() {
    var magnifierConfig = {
        magnifier: "#preview",//最外层的大容器
        width: 450,//承载容器宽
        height: 450,//承载容器高
        moveWidth: null,//如果设置了移动盒子的宽度，则不计算缩放比例
        zoom: 2//缩放比例
    };
    var _magnifier = magnifier(magnifierConfig);
}
