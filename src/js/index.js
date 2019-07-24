//数据内容存放盒子$('.dd-inner')

//数据渲染
let hinit = new Promise(function (resolve) {
    $.ajax({
        type: 'post',

        url: 'api/nav.php',
        data: '',
        success: function (str) {
            let arr = JSON.parse(str);
            // console.log(arr.data);
            resolve(arr.data);
        }
    });
});
hinit.then(function (data) {
    res = sliceArr(data, 3);
    let size = 42;
    let html = res.map(function (item) {
        size -= 43;
        // console.log(item[0]);
        return `<li class="item" data-id='${item[0].id}'>
                <h3><i class="i-nav" style="background-position:-28px ${size}px;"></i>
                <a href="html/goodslist.html?category=${item[0].Cname}" target="_blank" class="link" >${item[0].Cname}</a><div class="arrow-right">
                </div></h3>
                <h4><a href="###">${item[1].Cname}</a></h4>
                <h4><a href="###">${item[2].Cname}</a></h4>
                <div class='sub-menu'>
                    <div class="sub-list">
                    </div>
                    <div class='sub-right'>
                    </div>
                </div>
            </li>`;
    }).join('');
    $('.dd-inner').html(html);
});
let simg = null;
//鼠标划过特效 mouseover
$('.dd-inner').on('mouseover', '.item', function () {
    let pid = this.dataset.id;
    let ddthis = this;
    $.ajax({
        type: 'post',
        url: 'api/nav3.php',
        data: 'pid=' + pid,
        asyn: false,
        success: function (str) {
            let arr = JSON.parse(str);
            show(arr.data, arr.img);
        }
    });
    function show(data, img) {
        //文字部分
        let html = data.map(function (item) {
            let dd = item.content;
            let arr = dd.split(',');
            let str = arr.map(function (item) {
                return '<dd class="liItem ">' + item + '</dd>';
            })
            return ` 
                        <dl class="slBlock">
                            <dt class="liTitle">${item.Cname}</dt>
                            ${str}                               
                        </dl>
                        <div class="split">
                        </div>            
                    `;
        }).join('');
        $('.sub-menu').find($('.sub-list')).empty();
        $(ddthis).find($('.sub-list')).html(html);
       // console.log($(ddthis).find($('.sub-menu')).html(html));
        //图片部分
        //小图
        let arrSimg = img[0].navSimg.split(',');
        let strImg = arrSimg.map(function (item) {
            item = item.slice(7);
            console.log(item);
            return "<li><img src='" + item + "' alt=''></li>"
        }).join('');
        let bimg =img[0].navBimg.slice(6);
        $(ddthis).find($('.sub-right')).html("<ul class='sub-brands clearfix'>" + strImg + "</ul>" + "<img class='sub-ad' src='" + bimg + "' alt=''>");
        
    }
    $(this).find('.sub-menu').show();
});
$('.dd-inner').on('mouseout', '.item', function (){
    $(this).find('.sub-menu').hide();
});


//切割数组
function sliceArr(array, size) {
    var result = [];
    for (var x = 0; x < Math.ceil(array.length / size); x++) {
        var start = x * size;
        var end = start + size;
        result.push(array.slice(start, end));
    }
    return result;
}