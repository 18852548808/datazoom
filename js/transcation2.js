$(function() {
    function onChecked(val) {
        if (!val.hasClass('checked')) {
            $('.list_item').children('span').removeClass('checked');
            val.addClass('checked');
        }
    }

    // 自定义属性myid是当前渲染数据的标识 0-全部 1-收入 2-支出
    var list_item = $('.list_item');
    var all_pro = $('.all_pro');
    var income_pro = $('.income_pro');
    var pay_pro = $('.pay_pro');
    var more = $('.more');
    var proCon = $('.proCon');
    list_item.on('click', '.all_item',function() {
        console.log(1)
        $("body").stop().animate({scrollTop:0}, 500);
        onChecked($(this));
        proCon.empty();
        more.hide();
        income_pro.hide();
        pay_pro.hide();
        all_pro.show();
        // proCon.data('myid','0');
        getAllDateFir(all_pro.find('.proCon'));
    });
    list_item.on('click', '.income', function() {
        console.log(2)
        $("body").stop().animate({scrollTop:0}, 500);
        onChecked($(this));
        proCon.empty();
        more.hide();
        all_pro.hide();
        pay_pro.hide();
        income_pro.show();
        // proCon.data('myid','1');
        getAllDateFir(income_pro.find('.proCon'));
    });
    list_item.on('click', '.payfor', function() {
        console.log(3)
        $("body").stop().animate({scrollTop:0}, 500);
        onChecked($(this));
        proCon.empty();
        more.hide();
        all_pro.hide();
        income_pro.hide();
        pay_pro.show();
        getMore.hide()
        // proCon.data('myid','2');

    });

    /******吸顶条******/
    var list_item0 = $('.list_item0');
    var list_itemT =list_item.offset();//返回或设置导航栏相对于文档的偏移(位置)


    /****** 数据用变量******/
    var url = 'transcation.json';
    var allCoinAsset = $('.amount_one'); // 总金额
    var timeDate=''; // 获取最后一条数据的时间
    var currPage = 0; // 真实时传递的页数
    var pages =3; // 虚拟数据获取
    var off_on = false;
    var dataTimers = null; //定时器(滚动加载方法 2 中用的)
    var getMore = $('.getMore');
    /******渲染后首次获取数据******/
    getAllDateFir(all_pro.find('.proCon'));

    /****** function ******/
    /***** 第一次获取 ****/
    function getAllDateFir(obj) {
        currPage =0;
        pages = 3
        var objF = obj;
        objOpen($('#loaderIcon')); // 加载中
        $.ajax({
            url:url,
            data:{},
            dataType:'json',
            success:function (res) {

                if(res !== null){
                    objClose($('#loaderIcon')); // 加载结束
                    allCoinAsset.html(res.allCoinAsset); // 总资产
                    // 有数据时
                    if(res.detailList!=null){
                        off_on =true;
                        var detailList = res.detailList;
                        $.each(detailList,function (index,item) {
                            if(index==0) { // 第一条数据
                                timeDate = detailList[index].receiveDate;
                                var html = addDate(detailList[0].receiveDate)+addDataList(detailList[0]);
                                objF.append(html);
                            }else if(detailList[index].receiveDate !== detailList[index-1].receiveDate){ // 和前一条数据时间对比不相同，新建一个时间
                                timeDate = detailList[index].receiveDate;
                                var html = addDate(detailList[index].receiveDate)+addDataList(detailList[index]);
                                objF.append(html);
                            }else{ // 和前一条数据时间对比相同
                                objF.append(addDataList(detailList[index]));
                            }
                        });

                        getMore.show()
                    }
                    // 没有数据时
                    if (res.detailList==null||res.detailList.length==0) {
                        getMore.html('<span>没有更多啦</span>');
                        getMore.addClass('colorGray');
                        off_on =false;
                    }else{
                        getMore.html('<span>点击加载更多</span>');
                        getMore.removeClass('colorGray');
                    }

                }else{
                    getMore.html('<span>没有更多啦</span>');
                    getMore.addClass('colorGray');
                    off_on =false;
                }
            }
        })
    }


    /***** 滚屏获取 ****/
    function getAllDate(obj) {
        if (obj.next().css('display')=="block") {
            currPage = 0;
            return;
        }
        currPage = currPage + 1;
        var objF = obj;
        objOpen($('#loaderIcon')); // 加载中
        $.ajax({
            url:url,
            data:{}, // currPage:currPage, customerid:customerUid
            dataType:'json',
            success:function (res) {
                pages--;
                if(res !== null) {
                    objClose($('#loaderIcon')); // 加载结束

                    if(res.todayCoinCount==0&&res.detailList.length>0  && pages !== 0){
                        off_on =true;
                        var detailList = res.detailList;
                        $.each(detailList,function (index,item) {
                            if(index == 0) {
                                if(detailList[0].receiveDate === timeDate){
                                    objF.append(addDataList(detailList[index]));
                                }else{
                                    timeDate = detailList[index].receiveDate;
                                    var html = addDate(detailList[index].receiveDate)+addDataList(detailList[index]);
                                    objF.append(html);
                                }
                            }else if(index>0 && detailList[index].receiveDate !== detailList[index-1].receiveDate){
                                timeDate = detailList[index].receiveDate;
                                var html = addDate(detailList[index].receiveDate)+addDataList(detailList[index]);
                                objF.append(html);
                            }else{

                                objF.append(addDataList(detailList[index]));
                            }

                        });

                    }
                    // 没有数据时
                    if (res.detailList==null||res.detailList.length==0 || pages == 0) {
                        getMore.html('<span>没有更多啦</span>');
                        getMore.addClass('colorGray');
                        off_on =false;
                    }
                }else{
                    getMore.html('<span>没有更多啦</span>');
                    getMore.addClass('colorGray');
                    // noMore(objF);
                    off_on =false;
                }
            }
        })
    }

    /****** 吸顶条 ******/
    $(window).on('scroll',function(){
        topScroll(list_item,list_itemT,list_item0)
    });
    $(window).on("touchmove", function() {
        topScroll(list_item,list_itemT,list_item0)
    });
    //加个屏幕滚动事件，c是滚动条相当于文档最顶端的距离
    function topScroll(obj,objT,obj0) {
        list_item.addClass("sticky");
        if(/android/i.test(navigator.userAgent)){
            var dT = $(document).scrollTop();
            //当滚动的屏幕距离大于等于导航栏本身离最顶端的距离时（判断条件）给它加样式（根据自己业务的条件加样式，一般如下
            if(objT.top<=dT){
                obj.css({'position':'fixed','backgroundColor':'#fff'})
                obj0.show();
            }else{
                obj.css({'position':'relative','backgroundColor':'#f8f8f9'})
                obj0.hide();
            }
        }

        if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
            console.log('ios')
            list_item.addClass("sticky");
        }
    }



    function noMore(obj){
        obj.next().show();
    }
    // 添加时间
    function addDate(str){
        var html='<div class="time_record">'+str+'</div>';
        return html;
    };
    // 添加具体数据
    function addDataList(json){
        var html = '<div class="product">'
            +'<div class="numb">'
                +'<div class="product_name line">'
                    +'<span class="icon"></span>'
                    +'<span class="pro_cont">+'+json.receiveNum+' '+json.coinName+'</span>'
                +'</div>'
                +'<div class="product_price">'
                    +'<h5>'+json.taskName+'</h5>'
                    +'<p>'+json.receiveTime+'</p>'
                +'</div>'
            +'</div>'
        +'</div>'
        +'<div class="kuan"></div>';
        return html;
    };

    /****** 显示 *****/
    function objOpen(obj){
        obj.show();
    };
    /****** 隐藏 *****/
    function objClose(obj){
        obj.hide();
    };


    //还可以基window窗口（body）来添加滚动事件, (因为布局不同,所以在这里没效果，因为[上面是基于body中的某个元素来添加滚动事的])



    /*$(window).on('scroll',function(){
        scrollAndtouchmove()
    });/!**body-scroll**!/

    $(window).on('touchmove',function(){
        scrollAndtouchmove()
    });/!**body-scroll**!/*/
    getMore.on('click',function () {
        scrollAndtouchmove()
    });
    function scrollAndtouchmove() {
        var obj ;
        // var whichObj = proCon.data('myid'); // 0-全部 1-收入 2-支出
        if(all_pro.css('display') == 'block'){ // 判断是哪个数据需要被渲染
            obj = all_pro.find('.proCon');
        }else if(income_pro.css('display') == 'block'){
            obj = income_pro.find('.proCon');
        }else{
            return false;
        }
        if(off_on){
            //当时滚动条离底部60px时开始加载下一页的内容
            if (($(window).height() + $(window).scrollTop() + 60) >= $(document).height()) {
                clearTimeout(dataTimers);
                dataTimers = setTimeout(function() {
                    getAllDate(obj);
                }, 300);
            }
        }else{
            return false;
        }
    }

}); /**ready**/







