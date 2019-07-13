function car() {
    /*
 
        准备一个订单表：多用户购物车,在详情页点击'加入购物车'按钮，就要把一个商品的相关数据存起来
 
            字段：商品id、店铺id、用户id、商品标题、商品单价、购买数量、库存量
 
 
        需求：购物车的制作需要上面的数据提前准备好
 
            1.数据渲染：把订单表的订单信息渲染到购物车里面；(接口)
            2.点击数量的加、减、手动修改数量可以修改表里面数量(订单表)(接口)
            3.小计跟着数量变化
            4.删除当行商品；(接口)
            5.全选、不选，控制总数量、总价格变化
            6.全删、多个删除(接口)
    */

    //1.点击数量的加、减、手动修改数量可以修改表里面数量
    //事件委托绑定事件

    //数量的加
    $('.cartMain').on('click', '.plus', function () {
        //点击加号：数量增1
        let num = $(this).prev().val();
        // let kucun = $(this).prev().data('num');
        let kucun = 20;
        num++;
        if (num >= kucun) {
            num = kucun;
        }
        $(this).prev().val(num)
        update(num, $(this));
        goodTotal($(this));//把点击当前的那个按钮传到函数，通过节点的关系查找其他节点
    });

    //数量的减
    $('.cartMain').on('click', '.reduce', function () {
        let num = $(this).next().val();
        num--;
        if (num <= 1) {
            num = 1;
        }
        $(this).next().val(num);
        update(num, $(this));
        goodTotal($(this));
    });

    //手动输入数量的变化
    $('.cartMain').on('input', '.sum', function () {
        let num = $(this).val();
        // let kucun = $(this).data('num');
        let kucun = 20;
        if (num <= 1) {
            num = 1;
        } else if (num >= kucun) {
            num = kucun;
        }
        $(this).val(num);
        // console.log();
        goodTotal($(this));//小计变化
        // console.log($(this));
        update(num, $(this));
    }); 2
    //数量发生变化时
    function update(num, goods) {
        let id = goods.parent().parent().parent().find('.son_check').attr("id")
        let upd = new Promise(function (resolve) {
            $.ajax({
                type: 'post',
                url: '../api/updatacar.php',
                data: 'id=' + id + '&uname=' + $.cookie('uid') + '&num=' + num,
                success: function (str) {
                    let arr = JSON.parse(str);
                    // console.log(str)
                }
            });
        });
    }
    function delg(id) {
        let delgoods = new Promise(function (resolve) {
            $.ajax({
                type: 'post',
                url: '../api/delgoods.php',
                data: 'id=' + id + '&uname=' + $.cookie('uid'),
                success: function (str) {
                    let arr = JSON.parse(str);
                    return arr.data;
                }
            });
        });
    }
    //2.小计=单价*数量
    function goodTotal(now) {
        //单价
        let price = $(now).parent().parent().parent().find('.price').html().slice(1);//获取到单价是有单位，去掉多余的单位
        //数量
        //console.log(price);
        let num = $(now).parent().find('.sum').val();
        //console.log(num);
        let total = (price * num).toFixed(2);//保留两位小数
        $(now).parent().parent().parent().find('.sum_price').html('￥&nbsp;' + total);
        numAndToal();//总数量和总价变化
        // console.log(price,num,total);
    }

    //3.删除当行商品；
    $('.cartMain').on('click', '.del', function () {
        //要删除的节点.remove()
        let res = confirm('您要删除我吗？');
        if (res) {
            if ($(this).parent().parent().parent().find('.list_op').size() == 1) {
                $(this).parent().parent().parent().parent().remove();
            };
            $(this).parent().parent().remove();
        }
        numAndToal();
        let id = $(this).parent().parent().find('.son_check').attr("id");
        // console.log(id);
        delg(id);
    });



    //全选
    $('#all').on('click', function () {
        //console.log($(this))
        let now = $(this).prop('checked');
        $('.shopChoice').prop('checked', now);
        $('.son_check').prop('checked', now);
        numAndToal();
    });
    //总数量和总价格的变化
    function checkedRows(check) {
        let arr = [];//存被勾选的下标
        check.each(function (i, item) {
            if ($(item).prop('checked')) {
                //被勾选的复选框把他的下标存起来
                arr.unshift(i);
            }
        });
        //降序
        arr.sort(function (a, b) {
            return b - a;
        });
        return arr;
    }
    //选中的商店

    function numAndToal() {
        //判断哪一行是被勾选的
        let arr = checkedRows($('.son_check'));
        //console.log(arr);

        //计算总数量和总价格
        let sum = 0;//总数量
        let priceAll = 0;
        arr.forEach(function (item) {
            sum += $('.sum').eq(item).val() * 1;
            priceAll += $('.sum_price').eq(item).text().slice(1) * 1;
            // console.log(priceAll);
        });
        //console.log(sum,priceAll);

        $('.piece_num').html(sum);
        $('.total_text').html(priceAll.toFixed(2));

    }
    //通过店铺控制商品
    $('.shopChoice').on('click', function () {
        let now = $(this).prop('checked');
        // console.log($(this));
        $(this).parent().parent().parent().find('.son_check').prop('checked', now);
        numAndToal();
        if ($('.shopChoice').size() == $('.shopChoice:checked').size()) {
            $('.whole_check').prop('checked', true);
        } else {
            $('.whole_check').prop('checked', false);
        }
    });


    //点击每一行复选框反过来控制全选按钮
    $('.cartMain').on('click', '.son_check', function () {
        //被勾选的个数==本来集合的个数  全选
        let checkedNum = $('.son_check:checked').size();
        let num = $('.son_check').size();
        if (checkedNum == num) {
            $('.whole_check').prop('checked', true);
        } else {
            $('.whole_check').prop('checked', false);
        }
        //商品控制商铺
        let shopnum = $(this).parent().parent().parent().find('.son_check').size();
        let shopchose = $(this).parent().parent().parent().find('.son_check:checked').size();
        if (shopchose == shopnum) {
            $(this).parent().parent().parent().parent().find('.shopChoice').prop('checked', true);
        } else {
            $(this).parent().parent().parent().parent().find('.shopChoice').prop('checked', false);
        }
        numAndToal();//总数量和总价跟着变
    });

    //全删
    $('.delAll').on('click', function () {
        let arr = checkedRows($('.son_check'));//被勾选商品的行对应的下标
        let arr2 = checkedRows($('.shopChoice'));//商店
        // console.log(ids);
        let res = confirm('您要删除我们吗？');
        if (res) {
            arr.forEach(function (item) {
                let id = $('.son_check').eq(item).attr('id');
                delg(id);
                if (delg(id)) {
                    $('.order_lists').eq(item).remove();
                };
            });
            $('.son_check').prop('checked', false);
            arr2.forEach(function (item) {
                $('.cartBox').eq(item).remove();
            });
        }
        numAndToal();//总数量和总价跟着变
    });

};
