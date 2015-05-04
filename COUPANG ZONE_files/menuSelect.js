$(document).ready(function() {
    $(".active").removeClass("active");

    //TODO 메뉴 로직 수정
    var pathname = window.location.pathname;
    if (pathname === "/") {
        $(".inProgressAuctionMenu").addClass("active");
    } else if (pathname === "/auctions/biddings") {
        $(".myBiddingMenu").addClass("active");
    } else if (pathname === "/auctions/successes") {
        $(".mySuccessfulBidMenu").addClass("active");
    } else if (pathname === "/auctions/history") {
        $(".auctionHistoryMenu").addClass("active");
    }
});