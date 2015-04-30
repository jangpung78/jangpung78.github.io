var getAuctionStatus = function(auctionId, url, callback) {
    $.ajax({
        url: url,
        data: { auctionId : auctionId }
    }).done(callback);
};
var setData = function() {
    var form = {
        auctionId : $('#bidPrice').data('auctionId'),
        biddingPrice : $('#bidPrice').data('bidPrice')
    };

    return form;
};
var saveBid = function (callback) {
    $.ajax({
        url: '/bidding',
        method: "POST",
        type: "json",
        contentType: "application/json",
        data: JSON.stringify(setData())
        ,success : function(data){
            var statusCode = data.statusCode;
            if(statusCode === 200) {
                alert("입찰 성공하였습니다");
                window.location.href = '';
            }
            else if(statusCode === 703) {
                $(".notify").notify(
                    "최고 입찰가가 아닙니다",
                    { className: "warn", position: "top" }
                );
                $('#bidPrice').data('count', 0);
                setModalForm($('#bidPrice').data('auctionId'));
            }
            else if(statusCode === 601) {
                $(".notify").notify(
                    "경매가 종료되었습니다",
                    { className: "error", position: "top" }
                );
            }
            else{
                $(".notify").notify(
                    "입찰 오류",
                    { className: "error", position: "top" }
                );
            }
        }
    }).done(callback);
};

var init = function() {
    $('#modal-img').attr('src', "");
    $('#itemOption').html("");
    $('#itemName').html("");
    $('#itemUrlName').html("");
    $('#itemUrl').attr('href', "");
    $('#remark').html("");
    $('#startPrice').html("");
    $('#endDate').html("");
    $('#nowPrice').html("");
    $('#nowPrice').data('nowPrice', 0);
    $('#bidCount').data('bidCount', 0);
    $('#bidderName').html("");
    $('#bidPrice').html("");
    $('#bidPrice').data('bidPrice', 0);
    $('#bidPrice').data('auctionId', 0);
    $('#bidPrice').data('bidPrice', 0);
    $('#bidPrice').data('count', 0);
};
var formatDate = function(enddate) {
    var setDate = new Date(enddate);
    var year = setDate.getFullYear();
    var month = setDate.getMonth() + 1;
    var day = setDate.getDate();
    var hour = setDate.getHours();
    var minute = setDate.getMinutes();
    var second = setDate.getSeconds();
    var formatEndDate = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    return formatEndDate;
};

function setComma(count) {
 return count.toFixed(0).replace(/./g, function(c, i, a) {
     return i > 0 && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}

function setModalForm(auctionId, url) {
    getAuctionStatus(auctionId, url, function(data) {
        $('#bidPrice').data('auctionId', auctionId);
        $('#modal-img').attr('src', data.picture);
        $('#itemOption').html(data.itemOption);
        $('#itemName').html(data.itemName);
        $('#itemUrlName').html(data.url);
        $('#itemUrl').attr('href', data.url);
        $('#remark').html(data.remark);
        $('#startPrice').html(setComma(data.startPrice) + "원");
        $('#endDate').html(formatDate(data.endDate));
        $('#bidPrice').html(setComma(data.startPrice) + "원");
        $('#bidPrice').data('bidPrice', data.startPrice);

        $('#bidPrice-reset').click(function () {
            $('#bidPrice').html(setComma(data.startPrice) + "원");
            $('#bidPrice').data('bidPrice', data.startPrice);
        });

        $('#nowPrice').html(setComma(data.startPrice) + "원");
        $('#bidCount').html(data.bidCount + "번");
        $('#nowPrice').html(setComma(data.bidPrice) + "원");
        $('#nowPrice').data('nowPrice', data.bidPrice);
        $('#bidderName').html(data.bidderName);
        $('#bidPrice').html(setComma(data.bidPrice) + "원");
        $('#bidPrice').data('bidPrice', data.bidPrice);
    });
}
$('body')
.on('click', '[data-auctionid]', function(){
    init();
    var auctionId = $(this).data('auctionid');
    setModalForm(auctionId, '/auctions/' + auctionId + '/detail');
})
.on('click', '[data-auctionhistoryid]', function() {
    init();
    var auctionId = $(this).data('auctionhistoryid');
    setModalForm(auctionId, '/auctions/history/' + auctionId + '/detail');
})
.on('click', '#bidPrice-100', function(){
    var bidPrice = $('#bidPrice').data('bidPrice');
    var count = $('#bidPrice').data('count');
    bidPrice += 100;
    count +=100;
    $('#bidPrice').html(setComma(bidPrice)+"원   (+"+setComma(count)+"원)");
    $('#bidPrice').data('bidPrice',bidPrice);
    $('#bidPrice').data('count',count);
})
.on('click', '#bidPrice-300', function(){
    var bidPrice = $('#bidPrice').data('bidPrice');
    var count = $('#bidPrice').data('count');
    bidPrice += 300;
    count +=300;
    $('#bidPrice').html(setComma(bidPrice)+"원   (+"+setComma(count)+"원)");
    $('#bidPrice').data('bidPrice',bidPrice);
    $('#bidPrice').data('count',count);
})
.on('click', '#bidPrice-500', function(){
    var bidPrice = $('#bidPrice').data('bidPrice');
    var count = $('#bidPrice').data('count');
    bidPrice += 500;
    count +=500;
    $('#bidPrice').html(setComma(bidPrice)+"원   (+"+setComma(count)+"원)");
    $('#bidPrice').data('bidPrice',bidPrice);
    $('#bidPrice').data('count',count);
})
.on('click', '#bidBtn', function(){
    saveBid();
})
.on('click', '#refreshBtn', function(){
    $('#bidPrice').data('count', 0);
    var auctionId = $('#bidPrice').data('auctionId');
    setModalForm(auctionId, '/auctions/' + auctionId + '/detail');
})
.on('click', '#bidPrice-reset', function(){
    $('#bidPrice').data('count', 0);
    var nowPrice = $('#nowPrice').data('nowPrice');
    $('#bidPrice').html(setComma(nowPrice) + "원");
    $('#bidPrice').data('bidPrice', nowPrice);
})
.on('click', '#adminBtn', function(){
    window.location.href = "/admin/auctions/search/date";
});

$("#searchText").on('click',function(){
    if($("#searchView").val().length<2)
    {
        alert("2자 이상 적으세요");
    }else{
        $("#searchValue").val(encodeURI($("#searchView").val(),"UTF-8"));
        $("#searchForm").submit();
    }
});
$("#searchView").on('keydown',function(){
    if(event.keyCode==13) {
        if($("#searchView").val().length<2) {
            alert("2자 이상 적으세요");
        }else{
            $("#searchValue").val(encodeURI($("#searchView").val(),"UTF-8"));
            $("#searchForm").submit();
        }
    }
});
