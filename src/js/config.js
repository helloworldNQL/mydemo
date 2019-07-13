//配置参数
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
        'citys' : ['jq']
    }
});