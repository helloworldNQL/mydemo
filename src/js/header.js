//数据内容存放盒子$('.dd-inner')

//数据渲染
function init() {
    $.ajax({
        type: 'post',

        url: '../api/nav.php',
        data: '',
        success: function (str) {
            let arr = JSON.parse(str);
            // console.log(arr.data);
            res = sliceArr(arr.data, 3);
            let size = 42;
            let html = res.map(function (item) {
                size -= 43;
                return `<li class="item" data-id='${item[0].id}'>
                <h3><i class="i-nav" style="background-position:-28px ${size}px;"></i>
                <a href="" class="link">${item[0].Cname}</a><div class="arrow-right">
                </div></h3>
                <h4><a href="">${item[1].Cname}</a></h4>
                <h4><a href="">${item[2].Cname}</a></h4>
            </li>`;
            }).join('');
            $('.dd-inner').html(html);

        }
    });

}

//鼠标划过特效 mouseover
$('.dd-inner').on('click', '.item', function () {
    let pid = this.dataset.id;
    let ddthis = this;
    $.ajax({
        type: 'post',
        url: '../api/nav3.php',
        data: 'pid=' + pid,
        asyn: false,
        success: function (str) {
            let arr = JSON.parse(str);
            // console.log(arr.img);
            show(arr.data,arr.img);
        }
    });
    function show(data,img) {
        let html = data.map(function (item) {
            let  dd = item.content;
            let arr = dd.split(',');
            let bimg ='..' + img[0].navBimg.slice(6) ;
            //小图
            let arrSimg = img[0].navSimg.split(',');
            // console.log(arrSimg);
            let strImg = arrSimg.map(function(item){
                item = '..' + item.slice(6);
                return "<li><img src='"+ item +"' alt=''></li>"
            });
            console.log(strImg);
            let str = arr.map(function(item){
                return '<dd class="liItem ">'+ item +'</dd>';
            })
            return ` <div class="sub-list">
                        <dl class="slBlock">
                            <dt class="liTitle">${item.Cname}</dt>
                            ${str}                               
                        </dl>
                        <div class="split">
                        </div> 
                    </div>
                    <div class="sub-right">
                        <ul>
                            ${strImg}
                        </ul>
                        <img src="${bimg}" alt="">
                    </div>
                    `;
        }).join('');
        $(ddthis).append("<div class='sub-menu'></div>");
        $(ddthis).find($('.sub-menu')).html(html);
    }
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