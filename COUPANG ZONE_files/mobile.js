/**
* Created by Coupang on 14. 10. 22..
*/
var mobileKeyWords = new Array('iPhone', 'iPod', 'BlackBerry', 'Android', 'Windows CE', 'LG', 'MOT', 'SAMSUNG', 'SonyEricsson');
for (var word in mobileKeyWords){
    if (navigator.userAgent.match(mobileKeyWords[word]) != null){
        var fontSize = 3+"em";
        $('.thumbnail').each(function(){
	        $(this).css('height', 'auto');
        });
	    $('.mobile-div').each(function(){
		    $(this).removeAttr("style");
	    });
	    $('.mobile-itemName').each(function(){
            $(this).css({'font-size' : fontSize});
        });
        $('.mobile-originalPrice').each(function(){
            $(this).css({'font-size' : fontSize});
        });
        $('.mobile-startPrice').each(function(){
            $(this).css({'font-size' : fontSize});
        });
        $('.mobile-endDate').each(function(){
            $(this).css({'font-size' : fontSize});
        });
        $('[data-auctionidatmain]').each(function(){
            $(this).css({'font-size' : fontSize});
        });
        $('.mobile-btn').each(function(){
            $(this).css({'font-size' : fontSize});
        });
        $('body')
            .on('click', '[data-auctionid]', function(){
                var width = 90+"%";
                var fontSize = 2+"em";
                $('.mobile-modal').css({'width': width});
                $('.mobile-modal-body').find('h4').css({'font-size': fontSize});
                $('.mobile-modal-body').find('a').find('h5').css({'font-size': fontSize});
                $('.mobile-modal-body').find('button').css({'font-size': fontSize});
            });
        break;
    }
}