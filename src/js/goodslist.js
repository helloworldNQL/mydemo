let iPage = 1;//获取第一页内容
let num = 8;//每页10条内容
let url = location.search;
//字符串转对象
let html = strToObj(decodeURI(url));
// console.log(html.category);
$('.crumbs-nav .item b').html(html.category);
let init = null;
function gListShow() {
    init = new Promise(function (resolve) {
        $.ajax({
            type: 'post',
            url: '../api/goodslist.php',
            data: 'category=' + html.category + '&page=' + iPage + '&num=' + num,
            success: function (str) {
                let arr = JSON.parse(str);
                // console.log(arr.data)
                resolve([arr.data, arr.pages1]);
                // console.log(arr.pages1);
            }
        });
    });
    init.then(function (data) {
        show(data[0], data[1]);
        // console.log();
    });
}
gListShow();
//分页点击事件
function show(data, pages) {
    //console.log(pages);
    //分页
    $(".zxf_pagediv").createPage({
        pageNum: Math.ceil(pages / num),
        current: iPage,
        backfun: function (e) {
            //console.log(e);//回调
            $('.zxf_pagediv').on("click", '.zxfPagenum', function () {
                // console.log($(this).html());
                iPage = e.current;
                gListShow();
            });
            $('.disabled').click(function () {
                iPage = iPage - 1;
                gListShow();
            })
            $('.nextbtn').click(function () {
                iPage = iPage + 1;
                gListShow();
            })
            $('.zxfokbtn').click(function () {
                iPage = $('.zxfinput').val();
                gListShow();
            })
        }
    });
    let html = data.map(function (item) {
        // console.log(item.img);
        let img = item.img.split(',');
        // console.log(img[0]);
        return ` <li class="gl-item">
                    <div class="p-tab">
                            <ul>
                            </ul>
                    </div>
                    <div class="p-cnt" presaleType="0">
                        <div class="item hasComment">
                            <div class="p-img">
                                <a href="goods.html?id=${item.gId}"target="_blank">
                                    <img src="${img[0]}" class="lazy">
                                </a>
                            </div>
                        <div class="price-icons">
                            <div class="price">
                                <span><b>￥</b>
                                    ${item.gNowPrice}
                                </span>
                                <div class="sam"></div>
                            </div>
                        </div>
                        <div class="p-name" isChoose="false" isFarfetch="false">
                            <a href="goods.html?id=${item.gId}" target="_blank">
                            <em>${item.gName}</em>
                            </a>
                        </div>
                        <div class="p-conduct">
                            <em></em>
                        </div>
                        <div class="p-buy">
                            <div class="assess">
                                <a href="###" target="_blank" class="comment"><i>${item.sales}</i><em> 条评价</em></a>
                            </div>
                        </div>
                        <div class='p-shop-name' isSelfDD="true">
                            <p>
                                <a class="p-shop-name-text" href="###" target="_blank">
                                    ${item.gshop}
                                </a>
                                <a class="p-shop-name-icon" href="###" target="_blank"></a>
                            </p>
                        </div>
                        <div class="p-icons"style="max-width: 200px">
                            <i class="icons serch_zy" data-tips="京东自营，品质保障">自营</i>
                            <i class="icons serch_mj" data-tips="本商品参与满减促销">满减</i>
                            <i class="icons serch_tax">包税 </i>
                        </div>
                        <div class="other">
                            <div class="cj-concern">
                                <i></i>
                                <em>关注</em>
                        </div>
                        <div class="p-operate">
                            <a href="javascript:;"class="p-o-btn contrast J_contrast"><i></i>对比</a>
                        </div>
                        <div class="addCart">
                            <a href="goodscar.html"><i></i><em>加入购物车</em></a>
                        </div>
                    </div>
                </div>
            </div>
        </li>`;
    }).join('');
    $('.gl-warp').html(html);
    $('.st-ext span').html(pages);
}
//点击综合按id排序
$('.zonghe').click(function () {
    init.then(function (data) {
        show(data[0], data[1]);
    });
    $(".f-sort a").removeClass("curr down up");
    $('.zonghe').addClass("curr");
    //$('.zonghe .f-cut').css({'background':' url(i/arrow-hover.png) no-repeat center'});    
})
//点击销量排行
$('.sales').click(function () {
    let gsal = new Promise(function (resolve) {
        $.ajax({
            type: 'post',
            data: 'category=' + html.category + '&page=' + iPage + '&num=' + num,
            url: '../api/goodslist.php',
            success: function (str) {
                let arr = JSON.parse(str);
                resolve([arr.sales, arr.pages1]);
            }
        });
    });
    gsal.then(function (data) {
        show(data[0], data[1]);
    });
    $(".f-sort a").removeClass("curr down up");
    $('.sales').addClass("curr");
});
//价格升降序排行
let desc = '';
$('.goods-price').click(function () {
    let gpri = new Promise(function (resolve) {
        $.ajax({
            type: 'post',
            data: 'desc=' + desc + '&category=' + html.category + '&page=' + iPage + '&num=' + num,
            url: '../api/goodslist.php',
            success: function (str) {
                let arr = JSON.parse(str);
                resolve([arr.pri, arr.pages1]);
            }
        });
    });
    gpri.then(function (data) {
        show(data[0], data[1]);
    });
    if (desc) {
        desc = '';
        $(".f-sort a").removeClass("curr up");
        $('.goods-price').addClass("down curr");
        $('.f-cut-price').css('background', '0 0');
    }
    else {
        $(".f-sort a").removeClass("curr down");
        $('.goods-price').addClass("up curr");
        $('.f-cut-price').css('background', '0 0');
        desc = 'desc';
        console.log(desc);
    }

});
//价格区间查询 .price-chose-focus
$('.price-chose').mouseover(function () {
    $('.price-chose').addClass("price-chose-focus");
});
$('.price-chose').mouseout(function () {
    $('.price-chose').removeClass("price-chose-focus");
});
$('#price-cancel').click(function () {
    $('#priceMin').val('');
    $('#priceMax').val('');
});
$('#priceBtn').click(function () {
    let min = $.trim($('#priceMin').val());
    let max = $.trim($('#priceMax').val());
    if(min && max){
        let gfind = new Promise(function (resolve) {
            $.ajax({
                type: 'post',
                data: 'category=' + html.category + '&min=' + min + '&max=' + max + '&page=' + iPage + '&num=' + num,
                url: '../api/goodslist.php',
                success: function (str) {
                    let arr = JSON.parse(str);
                    resolve([arr.chose, arr.pages2]);
                }
            });
        });
        gfind.then(function (data) {
            console.log(data[1]);
            show(data[0], data[1]);
        });
    }else{
        alert('请输入价格');
    }
    
});
//模糊查询
$('#resultSearchBtn').click(function () {
    let keyword = $.trim($('#resultSearchTxt').val());
    let likefind = new Promise(function (resolve) {
        $.ajax({
            type: 'post',
            data: 'category=' + html.category + '&keyword=' + keyword + '&page=' + iPage + '&num=' + num,
            url: '../api/goodslist.php',
            success: function (str) {
                let arr = JSON.parse(str);
                resolve([arr.find, arr.pages3]);
            }
        });
    });
    likefind.then(function (data) {
        show(data[0], data[1]);
    });
});