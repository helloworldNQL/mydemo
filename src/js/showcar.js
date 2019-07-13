setcookie();
//退出登录
if($.cookie('uid') == 'null'){
}else{
    usergoods($.cookie('uid'));
}
//用户购物车数据渲染
function usergoods(uname) {
    let goods = null;
    let gsal = new Promise(function (resolve) {
        $.ajax({
            type: 'post',
            data: 'uname=' + uname,
            url: '../api/findcar.php',
            success: function (str) {
                let arr = JSON.parse(str);
                // console.log(arr.data);
                resolve(arr.data);
            }
        });
    });
    //stop
    gsal.then(function (data) {
        let shopcar = data.map(function (item, index) {
            goods = new Promise(function (resolve) {
                // console.log(item.shopname);
                $.ajax({
                    type: 'post',
                    data: 'uname=' + uname + '&sname=' + item.shopname,
                    url: '../api/findcar.php',
                    success: function (str) {
                        let arr = JSON.parse(str);
                        //console.log(arr.goods);
                        resolve(arr.goods);
                    }
                });
            });
            goods.then(function (data) {
                let goodscar = data.map(function (shop) {
                    //console.log(shop);
                    let img = shop.img.split(',');
                    //  console.log(img);
                    return `<ul class="order_lists">
                    <li class="list_chk">
                        <input type="checkbox" id="${shop.gId}" class="son_check">

                    </li>
                    <li class="list_con">
                        <div class="list_img"><a href="javascript:;"><img src="${img[0]}" alt=""></a>
                        </div>
                        <div class="list_text"><a href="javascript:;">${shop.gName}</a></div>
                    </li>
                    <li class="list_info">
                        <p>规格：默认</p>
                        <p>尺寸：16*16*3(cm)</p>
                    </li>
                    <li class="list_price">
                        <p class="price">￥${shop.gNowPrice}</p>
                    </li>
                    <li class="list_amount">
                        <div class="amount_box">
                            <a href="javascript:;" class="reduce reSty">-</a>
                            <input type="text" value="${shop.dnum}" class="sum">
                            <a href="javascript:;" class="plus">+</a>
                        </div>
                    </li>
                    <li class="list_sum">
                        <p class="sum_price">￥${shop.gNowPrice}</p>
                    </li>
                    <li class="list_op">
                        <p class="del"><a href="javascript:;" class="delBtn">移除商品</a></p>
                    </li>
                </ul>`;
                }).join('');
                //console.log(index);
                $('.order_content').eq(index).html(goodscar);
            });
            
            return `<div class="cartBox">
            <div class="shop_info">
                <div class="all_check">
                    <! --店铺全选- ->
                    <input type="checkbox" id="" class="shopChoice">
                </div>
                <div class="shop_name">
                    店铺：<a href="javascript:;">${item.shopname}</a>
                </div>
            </div>
            <div class="order_content">
                
                
            </div>
            </div>`;
        }).join('');
        $('.cartMain_hd').after(shopcar);
    });
    Promise.all([gsal, goods]).then(() => {
        //console.log('values'); // [3, 1337, "foo"] 
        //console.log('aa');
        car();
    });
}

