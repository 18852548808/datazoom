$(function() {
    /*$('footer').on('click', '.icon_wallet', function() {
        if ($(this).css('background-image').indexOf('icon_qianbao@2x') > 0) {
            var s1 = $(this).css('background-image').replace('icon_qianbao@2x', 'icon_qianbao2@3x')
            $(this).css('background-image', s1);

            var s2 = $('.icon_money').css('background-image').replace('icon_zhaobi2@3x', 'icon_zhaobi@3x')
            $('.icon_money').css('background-image', s2)
        }
        
    });

    $('footer').on('click', '.icon_money', function() {
        if ($(this).css('background-image').indexOf('icon_zhaobi@3x') > 0) {
            var s1 = $(this).css('background-image').replace('icon_zhaobi@3x', 'icon_zhaobi2@3x')
            $(this).css('background-image', s1);

            var s2 = $('.icon_wallet').css('background-image').replace('icon_qianbao2@3x', 'icon_qianbao@2x')
            $('.icon_wallet').css('background-image', s2)
        }
        
    });
*/
    if($.trim(listCard.html()) == '' || listCard.height() == 0){
        $('.loadData').show();
    }
    getData();

    /***** 关注二维码 *****/
    $('.codeBtn a').on('click', function(e) {
        $('.attention').fadeIn();
        $('html').css('position','fixed');
        if(e.target.className.indexOf(".maskLayer") >= 0) {
            e.preventDefault();
        }
    });
    $('.codeBtn a').on('touchmove', function(e) {
        e.preventDefault();
    });
    $('.maskLayer').on('touchmove',function (e) {
        e.preventDefault();
    });
    $('.maskLayer').on('click',function (e) {
        $('.attention').hide();
        $('html').css('position','relative');
        return false;
    })
});

/**********获取数据*********/
var bigCard = $('#bigCard'); // 第一张卡盒子
var listCard = $('#listCard'); // 列表卡盒子
var url = "data.json"; // url地址
var allCoinAsset = $('#allCoinAsset');
function getData(){
    $.ajax({
        url:url,
        type:'get',
        data:{},
        dataType:'json',
        success:function (res) {
            $('.loadData').hide();
            allCoinAsset.html(res.allCoinAsset);
            var coinInfoList = res.coinInfoList;
            // bigCard.append(firstCard(coinInfoList[0]));

            $.each(coinInfoList,function (index,item) {

                    listCard.append(listCartItem(item))

            })
        }
    })
}

// 添加大卡
/*function firstCard(item) {
    var first = '<div class="quote_record">'
        +'<div class="shang">'
            +'<span class="left_lable" style="background-image: url('+item.coinIcon+');"></span>'
            +'<span class="lable_name">'+item.coinName+'</span>'
        +'</div>'
        +'<div class="xiang">'
            +'<span class="equal_to">≈</span>'
            +'<span class="amount_one">'+item.coinAssetStr+'</span>'
            +'<span class="cny">CNY</span>'
        +'</div>'
        +'<p class="price_info">'
            +'<span class="chs_price">行情价:</span>'
            +'<span> '+item.coinValue+'</span>'
            +'<span class="units">&nbsp;CNY</span>'
        +'</p>'
        +'<p class="quote_num">'
            +'<span class="chs_num">个&#x3000;数:</span>'
            +'<span class="now_num"> '+item.coinNum+'</span>'
        +'</p>'
    +'</div>';
    return first;
}*/

// 添加小卡
function listCartItem(item){
    var item = '<div class="eth">'
        +'<div class="shang">'
            +'<span class="eth_lable eths" style="background-image: url('+item.coinIcon+');"></span>'
            +'<span class="lable_name">'+item.coinName+'</span>'
        +'</div>'
        +'<div class="xiang">'
            +'<span class="equal_to">≈</span>'
            +'<span class="amount_one"> '+item.coinAssetStr+'</span>'
            +'<span class="cny">CNY</span>'
        +'</div>'
        +'<p class="price_info">'
            +'<span class="chs_price">行情价:</span>'
            +'<span> '+item.coinValue+'</span>'
            +'<span class="units">&nbsp;CNY</span>'
        +'</p>'
        +'<p class="quote_num">'
            +'<span class="chs_num">个数:</span>'
            +'<span class="now_num"> '+item.coinNum+'</span>'
        +'</p>'
    +'</div>';
    return item;
}
