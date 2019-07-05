//数据内容存放盒子$('.dd-inner')
let nav2txt = '';
//数据渲染
function init() {
    $.ajax({
        type: 'post',
        url: 'api/nav.php',
        //async: false,
        success: function (str) {
            let arr = JSON.parse(str);
            // {
            //     one: '奶粉'，
            //     two：{
            //         title : '婴儿奶粉',
            //         three :['1段','2段']
            //     }
            // }
            console.log(arr);
            res = sliceArr(arr.data, 3);
            let size = 42;
            let html = res.map(function (item) {
                size -= 43;
                let pid = item[0].id;
                $.ajax({
                    type: 'post',
                    //async: false,
                    url: 'api/nav2.php',
                    data: 'pid=' + pid,
                    success: function (str) {
                        let arr = JSON.parse(str);
                        console.log(arr);
                        // console.log(arr.data);
                        let html = arr.data.map(function (dt) {
                            pid = dt.id;
                            $.ajax({
                                type: 'post',
                                async: false,
                                url: 'api/nav2.php',
                                data: 'pid=' + pid,
                                success: function (str) {
                                    let arr = JSON.parse(str);
                                    str = arr.data.map(function (dd) {
                                        // console.log(dd.Cname);
                                        $('.item_dl_dd').html(dd.Cname);
                                    }).join('');
                                }
                            });
                            return ` <dl>
                                        <dt>${dt.Cname}</dt>                                
                                        <dd><a href="" class="item_dl_dd">
                                        </a></dd>
                                    </dl>
                                    <div class="split">
                                    </div> `;
                        }).join('');
                        $('.sub-list').html(html);
                    }
                });
                return `<li class="item" data-id='${item[0].id}'>
                <h3><i class="i-nav" style="background-position:-28px ${size}px;"></i>
                <a href="" class="link">${item[0].Cname}</a><div class="arrow-right">
                </div></h3>
                <h4><a href="">${item[1].Cname}</a></h4>
                <h4><a href="">${item[2].Cname}</a></h4>
                <div class="sub-menu">
                    <div class="sub-list">
                        
                    </div>
                </div>
            </li>`;
            }).join('');
            $('.dd-inner').html(html);

        }
    });

}
//鼠标划过特效 mouseover
$('.dd-inner').on('click', '.item', function () {
    //查找到节点 "sub-menu">"sub-list"><dl>
    //  console.log($('.dd-inner').children().html());
    // console.log(this.dataset.id);

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
