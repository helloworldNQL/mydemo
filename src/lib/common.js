//绑定控件
function getid(id) {
    return document.getElementById(id);
}
function getTagName(TagName, document) {
    return document.getElementsByTagName(TagName);
}
function getClassName(ClassName, document) {
    return document.getElementsByClassName(ClassName);
}

//获取4位验证码 
function code(html, num) {
    html = html || "1234567890qwertyuiopasdfghjklzxcvbnm";
    num = num || 4;
    //获取随机数
    var code = "";
    for (i = 0; i < num; i++) {
        var res = parseInt(Math.random() * html.length);
        code += html[res];
    }
    return code;
}

//封装一个函数：能够获取元素的样式(行内和非行内)，还能设置元素的样式（行内）
function css() {
    var ele = arguments[0];
    var attr = arguments[1];
    if(arguments.length == 2) {
        //获取样式
        if(getComputedStyle(ele,false)) {
            //证明在主流浏览器下：IE9+ 和 主流的浏览器
            return getComputedStyle(ele,false)[attr];
        }else{
            //低版本IE:IE678
            return ele.currentStyle(attr);
        }
    }else if(arguments.length == 3) {
        //设置样式
        // box.style.display = 'block';
        var val = arguments[2];
        ele.style[attr] = val;
    }

}
//封装选项卡
function xuan(btns, cons, cln) {
    for (var i = 0; i < btns.length; i++) {
        btns[i].index = i;
        btns[i].onmouseover = function () {
            for (var j = 0; j < btns.length; j++) {
                btns[j].className = '';//清空其他按钮的样式
                cons[j].style.display = 'none';
            }
            this.className = cln; cons[this.index].style.display = 'block';
        }

    }
}

//封装字符串转换成对象方法
function strToObj(str) {
    var json = {};//准备用来存对象的
    var data = '';//存参数：key0=0&key1=1&key2=2
    if (str.indexOf('?') >= 0) {
        //含有问号？，证明是一个完整的url，先截掉？前面的部分
        data = str.slice(str.indexOf('?') + 1);
    } else {
        data = str;
    }
    var arr1 = data.split('&');///["key0=0", "key1=1", "key2=2"]
    arr1.forEach(function (item) {
        var arr2 = item.split('=');//['key0','0']
        json[arr2[0]] = arr2[1];
    });
    // console.log(json);
    return json;

}
//封装对象转换为字符串

function objToStr(obj) {
    var str = [];
    for (i in obj) {
        str.push(i + '=' + obj[i]);
    }
    return str.join('&');
}

//封装时间的方法
function getTime() {
    //获取时间戳
    var time = new Date();
    //获取年月日时分秒
    var year = time.getFullYear();
    var mon = (time.getMonth() + 1).zero();
    var day = time.getDate().zero();
    var week = time.getDay();
    var hour = time.getHours();
    var min = time.getMinutes();
    var sec = time.getSeconds();
    //判断星期几  
    var w = '天一二三四五六';
    w = '星期' + w.charAt(week);
    //返回所需数据
    return {
        w: week,
        year: year,
        mon: mon,
        day: day,
        week: w,
        hour: hour,
        min: min,
        sec: sec
    };
}

//补零方法
function zero(num) {
    if (num < 10) {
        return '0' + num;
    } else {
        return '' + num;
    }
}

//敏感词过滤
function filterStr(str) {
    var arr = ['操', 'fuck', '小学鸡', '垃圾'];
    arr.forEach(function (item) {
        var reg = new RegExp(item, 'ig');
        str = str.replace(reg, '**');
    });
    return str;
}
var checkReg = {
    trim: function (str) {
        var reg = /^\s+|\s+$/g;
        return str.replace(reg, '');
    },
    tel: function (str) {
        var reg = /^1[3-9]\d{9}$/;
        return reg.test(str);
    },
    email: function (str) { //邮箱正则:a_a2-+.s @ a_a+2-.s  .s_a2
        var reg = /^\w+([\-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //网上推荐
        return reg.test(str);
    },
    idcard: function (str) { //身份证
        var reg = /^(\d{17}|\d{14})[\dX]$/;
        return reg.test(str);
    },
    psweasy: function (str) { //6-18位首字母开头
        var reg = /^[a-zA-Z]\w{5,17}$/;
        return reg.test(str);
    },
    pwwagain: function (str1, str2) { //确认密码
        return str1 === str2; //全等 恒等
    },
    urladr: function (str) { //路径：网址规则
        var reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
        return reg.test(str);
    },
    name: function (str) { //账号字母开头,6-20位
        var reg = /^[a-zA-Z][\w\-]{5,19}$/;
        return reg.test(str);
    },
    chinese: function (str) { //中文
        var reg = /^[\u2E80-\u9FFF]+$/;
        return reg.test(str);
    },
    birthday: function (str) { //生日
        var reg = /^((((19|20)\d{2})-(0?[13-9]|1[012])-(0?[1-9]|[12]\d|30))|(((19|20)\d{2})-(0?[13578]|1[02])-31)|(((19|20)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$/;
        return reg.test(str);
    }
}

function cloneDeep(obj) {//深度拷贝
    var str = JSON.stringify(obj);
    var newobj = JSON.parse(str);
    return newobj;
}

/*
	运动框架封装：startMove()过渡    jq animate()
	最终版：多对象，多属性，链式运动框架(运动队列)
	参数一：对象名
	参数二：属性，目标值  键名：属性名，键值：目标值    {'width':200,'heigth':400}  实现：宽度和高度一起改变，宽度变成200，高度变成400
	参数三：回调函数(可选参数)
 */

function startMove(obj, json, fnend) {

    clearInterval(obj.timer); //防止定时器叠加
    obj.timer = setInterval(function () {

        var istrue = true;

        //1.获取属性名，获取键名：属性名->初始值
        for (var key in json) { //key:键名   json[key] :键值
            //			console.log(key); //width heigth opacity
            var cur = 0; //存初始值

            if (key == 'opacity') { //初始值
                cur = css(obj, key) * 100; //透明度
            } else {
                cur = parseInt(css(obj, key)); // 300px  300  width heigth borderwidth px为单位的

            }

            //2.根据初始值和目标值，进行判断确定speed方向，变形：缓冲运动
            //距离越大，速度越大,下面的公式具备方向
            var speed = (json[key] - cur) / 6; //出现小数
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //不要小数部分，没有这句话或晃动

            //保证上一个属性全部都达到目标值了
            if (cur != json[key]) { //width 200 heigth 400
                istrue = false; //如果没有达到目标值，开关false
            } else {
                istrue = true; //true true
            }

            //3、运动
            if (key == 'opacity') {
                obj.style.opacity = (cur + speed) / 100; //0-1
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')'; //0-100
            } else {
                obj.style[key] = cur + speed + 'px'; //针对普通属性 left  top height 
            }

        }

        //4.回调函数:准备一个开关,确保以上json所有的属性都已经达到目标值,才能调用这个回调函数
        if (istrue) { //如果为true,证明以上属性都达到目标值了
            clearInterval(obj.timer);
            if (fnend) { //可选参数的由来
                fnend();
            }
        }

    }, 30); //obj.timer 每个对象都有自己定时器

}
//封装ajax
/* 
    jq:ajax
    $.ajax({
        type:'post',
        url:xx,
        data:'',
        async:true,
        success:fn
    });
 */
function ajax(opt){//配置参数
    extend = (obj1,obj2) =>{
        for(var key in obj2){//obj2覆盖obj1
            obj1[key]=obj2[key];
        }
    }
    var defaults = {//默认参数
        async:true
    }
    extend(defaults,opt);

    var xhr = new XMLHttpRequest();
    if(defaults.type.toLowerCase() == 'get'){
        if(defaults.data){
            defaults.url += '?' + defaults.data;
        }
        xhr.open(defaults.type,defaults.url,defaults.async);
        xhr.send(null);
    }else{
        xhr.open(defaults.type,defaults.url,defaults.async);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(defaults.data);
    }
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                if(defaults.success){
                    defaults.success(xhr.responseText);
                }
            }else{
                alert('错误http状态码是:'+ xhr.status);
            }
        }
    }


}