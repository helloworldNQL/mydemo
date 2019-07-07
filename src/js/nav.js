//数据内容存放盒子$('.dd-inner')

//数据渲染
function init() {
    $.ajax({
        type: 'post',

        url: '../api/nav.php',
        data: '',
        success: function (str) {
            let arr = JSON.parse(str);
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
                <div class="sub-menu">
                    
                </div>
            </li>`;
            }).join('');
            $('.dd-inner').html(html);

        }
    });

}

//鼠标划过特效 mouseover
$('.dd-inner').on('click', '.item', function (ev) {
    //查找到节点 "sub-menu">"sub-list"><dl>
    //  console.log($('.dd-inner').children().html()); 
    let pid = this.dataset.id;
    let ddthis = this;
    $.ajax({
        type: 'post',
        url: '../api/nav2.php',
        data: 'pid=' + pid,
        asyn: false,
        success: function (str) {
            let arr = JSON.parse(str);
            // console.log(arr.data);
            show(arr.data);
        }
    });
    //从里面拿到数据再渲染
    // console.log(dd);
    function show(data) {
        let html = data.map(function (item) {
            pid = item.id;
            // console.log(pid);
            $.ajax({
                type: 'post',
                url: '../api/nav2.php',
                asyn: false,
                data: 'pid=' + pid,
                success: function (str) {
                    let arr = JSON.parse(str);
                    /*  for (let i = 0; i < $('.sub-list dl').length; i++) {
                         arr.data.map(function (str) {
                             let html = '<dd><a href="">' + str.Cname + '</a></dd>';
                             $(ddthis).find($('.sub-list dl:eq(' + i + ')')).append(html);
                             // console.log(str);
                         })
                     } */
                     showdd(arr.data);
                }
            });
            return ` <div class="sub-list">
                        <dl>
                            <dt>${item.Cname}</dt>                                

                        </dl>
                        <div class="split">
                        </div> 
                    </div>`;
        }).join('');
        $(ddthis).find($('.sub-menu')).html(html);
    }
    function showdd(data){
        console.log(data);
        //运用porism 同步
        // arr.data.map(function (str) {
        //     let html = '<dd><a href="">' + str.Cname + '</a></dd>';

        //     console.log($(ddthis).find($('.sub-list dl:eq(' + i + ')')));

        // })
        // for (let i = 0; i < $('.sub-list dl').length; i++) {
        //     $(ddthis).find($('.sub-list dl:eq(' + i + ')')).append(html);
        // }
        //从ajax里面获取数据 dd ?

        // console.log($(ddthis).find($('.sub-list dl')).html())
    }

    // console.log(ddthis);
    // console.log($(ddthis).find($('.sub-menu')).html());
});
// 面向对象
// function show(){

// }

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