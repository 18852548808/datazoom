$(function() {

    /*$('.extract').on('click', function(e) {
        shows();
        e.preventDefault();
    });

    function shows() {
        $('.extr_pop').show();
       /!* $('html').css('overflow-y', 'hidden');
        $('body').css('overflow-y', 'hidden');*!/
    }*/

    /***** 关注二维码 *****/
    $('.extract').on('click', function(e) {
        $('.extr_pop').show();
        if(e.target.className.indexOf(".maskLayer") >= 0) {
            e.preventDefault();
        }
    });

    $('.maskLayer').on('click',function () {
        $('.extr_pop').hide();
        return false;
    })


});