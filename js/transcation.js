$(function() {
    function onChecked(val) {
        if (!val.hasClass('checked')) {
            $('.list_item').children('span').removeClass('checked');
            val.addClass('checked');
        }
    }

    var list_item = $('.list_item');
    $('.all_item').on('click', function() {
        onChecked($(this));
        $('.all_pro').show();
        $('.proCon').html('');
        $('.income_pro').hide();
        $('.more').hide();
        $('.pay_pro').hide();
        getAllDate($('.all_pro .proCon'));
    });
    $('.income').on('click', function() {
        onChecked($(this));
        $('.proCon').html('');
        $('.more').hide();
        $('.all_pro').hide();
        $('.income_pro').show();
        $('.pay_pro').hide();
        getIncomDate($('.income_pro .proCon'))
    });
    $('.payfor').on('click', function() {
        onChecked($(this));
        $('.proCon').html('');
        $('.more').hide();
        $('.all_pro').hide();
        $('.income_pro').hide();
        $('.pay_pro').show();
    });

    /******吸顶条******/
    var list_item = $('.list_item');
    var list_item0 = $('.list_item0');
    var list_itemT =list_item.offset();//返回或设置导航栏相对于文档的偏移(位置)
    topScroll(list_item,list_itemT,list_item0)

    /******数据******/
    getAllDate($('.all_pro'))
});

/****** function ******/
/****** 吸顶条 ******/
function topScroll(obj,objT,obj0) {
    //加个屏幕滚动事件，c是滚动条相当于文档最顶端的距离
    $('body').on('scroll',function(){
        var dT = $(this).scrollTop();
        //当滚动的屏幕距离大于等于导航栏本身离最顶端的距离时（判断条件）给它加样式（根据自己业务的条件加样式，一般如下
        if(objT.top<=dT){
            obj.css({'position':'fixed','backgroundColor':'#fff'})
            obj0.show();
        }else{
            obj.css({'position':'','backgroundColor':'#f8f8f9'})
            obj0.hide();
        }
    })
}


/****** 数据******/
var url = 'transcation.json2';
var allCoinAsset = $('.amount_one'); // 总金额
var all_pro = $('.all_pro'); // 全部记录
var pages =5;
var off_on = false;
var page = 1, //分页码
    timers = null; //定时器(滚动加载方法 2 中用的)
var timeDate=''; // 时间
function getAllDate(obj) {
    var objF = obj;
    objOpen($('#loaderIcon')); // 加载中
    off_on = true;
    $.ajax({
        url:url,
        data:{},
        dataType:'json',
        success:function (res) {
            objClose($('#loaderIcon')); // 加载结束

            allCoinAsset.html(res.allCoinAsset);
            if(res.todayCoinCount==0&&res.detailList.length>0){
                off_on =true;
                var detailList = res.detailList;
                $.each(detailList,function (index,item) {

                    // all_pro.append(LoadingDataFn(item))
                    // LoadingDataFn(item)
                    var time = item.receiveDate;
                    var first = detailList[0].receiveDate!==timeDate;
                    if(index==0 && first) {
                        var html = addDate(detailList[0].receiveDate)+addDataList(detailList[0]);

                        objF.append(html);
                    }else if(0 < index<detailList.length-1){
                        if(detailList[index].receiveDate !== detailList[index-1].receiveDate){
                            timeDate = detailList[index].receiveDate
                            var html = addDate(detailList[index].receiveDate)+addDataList(detailList[index]);
                            objF.append(html);
                        }else{

                            objF.append(addDataList(detailList[index]));
                        }
                    }else{
                        return;
                    }


                })
                pages--;
            }else{
                $('.transcationBox').append(noMore());
                off_on = !off_on;

            }
        }
    })
}

function getIncomDate(obj) {
    var objF = obj;
    objOpen($('#loaderIcon')); // 加载中
    off_on = true;
    $.ajax({
        url:url,
        data:{},
        dataType:'json',
        success:function (res) {
            objClose($('#loaderIcon')); // 加载结束

            allCoinAsset.html(res.allCoinAsset);
            if(res.todayCoinCount==0&&res.detailList.length>0){
                off_on =true;
                var detailList = res.detailList;
                $.each(detailList,function (index,item) {

                    // all_pro.append(LoadingDataFn(item))
                    // LoadingDataFn(item)
                    var time = item.receiveDate;
                    var first = detailList[0].receiveDate!==timeDate;
                    if(index==0 && first) {
                        var html = addDate(detailList[0].receiveDate)+addDataList(detailList[0]);

                        objF.append(html);
                    }else if(0 < index<detailList.length-1){
                        if(detailList[index].receiveDate !== detailList[index-1].receiveDate){
                            timeDate = detailList[index].receiveDate
                            var html = addDate(detailList[index].receiveDate)+addDataList(detailList[index]);
                            objF.append(html);
                        }else{

                            objF.append(addDataList(detailList[index]));
                        }
                    }else{
                        return;
                    }


                })
                pages--;
            }else{
                $('.transcationBox').append(noMore());
                off_on = !off_on;

            }
        }
    })
}

function addDate(str){ // 添加时间
    var html='<div class="time_record">'+str+'</div>';
    return html;
};
function addDataList(json){ // 添加具体数据
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
function noMore(){
    var html='<div class="more">没有更多啦</div>';
    return html;
}

/****** 开 *****/
function objOpen(obj){
    obj.show();
};
/****** 关 *****/
function objClose(obj){
    obj.hide();
};


//还可以基window窗口（body）来添加滚动事件, (因为布局不同,所以在这里没效果，因为[上面是基于body中的某个元素来添加滚动事的])

$('body').on('scroll',function(){
    var obj ;
    if($('.all_pro').css('display') === 'block'){
        obj = $('.all_pro');
    }else if($('.income_pro').css('display') === 'block'){
        obj = $('.income_pro');
    }else{
        return
    }
    //当时滚动条离底部60px时开始加载下一页的内容
    if (($(window).height() + $('body').scrollTop() + 60) >= $(document).height()) {
        clearTimeout(timers);
        if(off_on){
            timers = setTimeout(function() {
                objOpen($('#loaderIcon'));
                if(obj == $('.all_pro')){
                    getAllDate(obj);
                }else{
                    getIncomDate(obj)
                }

                page++;
                console.log("第" + page + "页");
            }, 300);
        }else{
            return false;
        }
    }

});







