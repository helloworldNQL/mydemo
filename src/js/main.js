/*

    配置参数：requirejs.config()/require.config() 因为两个方法功能相同，我取后面的演示
        * require.config() 设置配置参数
            * 参数：对象
                * path:配置短路径
                    基础路径：baseUrl 
                        * 写模块的时候，不加后缀，就是以main主入口文件所在路径为基础路径；
                        * 加后缀：以主模块引入的页面为基础路径
                * shim:配置依赖关系的
    加载模块：requirejs()/require() 因为两个方法功能相同，我取后面的演示
        * require() 引入子模块开发
            * 参数一：数组，子模块名
            * 参数二：回调函数，子模块都到达了才能运行总模块
    定义模块：define() 定义子模块


require(['config'], function () {
    //引入子模块，进行总模块开发

    require(['myquery'], function (res) {
        // console.log(aa);
        // $(document).click(function () {//在这里引入子模块继续开发功能
        //     alert(666);
        // });

        // show();
        console.log(res);
        console.log(res.randomCode());//对象名.方法名()
        console.log(res.randomColor(16));
    });
});*/
require.config({
    'paths' : {//配置短路径：在基础路径以外的地方，路径比较长，变成短路径方便后期使用,重命名
        'jq' : '../lib/jquery-1.10.1.min',//不写后缀，以requirejs所在目录为基础路径,推荐这种写法
        // 'jq' : 'lib/jquery-3.2.1.js'
        'cookie' : '../lib/jquery.cookie',   
        'showcar': '../js/showcar',
        'carts' : '../lib/carts',
        'citys' :'../lib/jquery.citys',
        'cityjson' : 'http://pv.sohu.com/cityjson'
    },
    'shim' : {//设置依赖关系的：这个shim可以让我们在异步代码中有同步的特性
        'cookie' : ['jq'],
        'showcar' : ['jq'],
        'carts' : ['jq','showcar'],
        'citys' : ['jq'],
        'cityjson' :['citys']
    }
});
require(['jq','cookie','showcar','carts','citys','cityjson'],function(){
    if (returnCitySN) {
        $('#location').citys({ code: returnCitySN['cid'] });
    }

    setcookie();
    carts();
});






