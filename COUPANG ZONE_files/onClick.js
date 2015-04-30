/**
 * Created with IntelliJ IDEA.
 * User: Coupang
 * Date: 2014. 8. 14.
 * Time: 오후 5:53
 * To change this template use File | Settings | File Templates.
 */
function popUpPosition(width, height) {
	var windowW = width;  // 창의 가로 길이
	var windowH = height;  // 창의 세로 길이
	var left = Math.ceil((window.screen.width - windowW) / 2);
	var top = Math.ceil((window.screen.height - windowH) / 2);
	var option = "top=" + top + ", left=" + left + ", height=" + windowH + ", width=" + windowW;
	return option;
}
$(document).ready(function () {
    $(".goListPageBtn").click(function () {
        window.location = "/admin/auctions/search/date";
    });
    $(".goUpdatePageBtn").click(function () {
        window.location = "/admin/auctions/" + auctionId + "/update";
    });
    //TODO post로 보내기
    $(".deleteBtn").click(function () {
        if (confirm('정말 삭제하시겠습니까?')) {
            window.location = "/admin/auctions/" + auctionId + "/delete";
        }
    });
    $(".logBtn").click(function () {
	    var option = popUpPosition(800, 800);
	    window.open("/admin/auctions/" + auctionId + "/log", "", option + "scrollbars=yes;");
    });
    $(".bidLogBtn").click(function () {
        var option = popUpPosition(800, 800);
        var auctionId = $(this).parent().parent().children(":first-child").html();
        window.open("/admin/auctions/" + auctionId + "/log", "", option + "scrollbars=yes;");
    });
    $("#excel").click(function () {
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var day = today.getDate();
        tableToExcel('table', 'SheetName', '쿠팡존_' + year + "_" + month + "_" + day + '.xls');
    });
    $(".goAddInside").click(function() {
       window.location = "/admin/auctions/add";
    });
    $("#userBtn").click(function() {
        window.location = "/";
    });
    $("#userAuthChangeBtn").click(function () {
	    var option = popUpPosition(500, 200);
	    window.open("/admin/usertype", "" ,option);
    });
	$(".searchNumOrNameBtn").click(function () {
		var inputNumOrName = $('.inputNumOrName').val();
		var selectNumOrName = $(".selectNumOrName option:selected").val();
		window.location = "/admin/auctions/search/" + selectNumOrName + "?keyword=" + inputNumOrName;
	});
});