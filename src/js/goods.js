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
        let color = col.map(function(item){
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
        
    });

}
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
