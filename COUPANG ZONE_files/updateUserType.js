var updateUserType = function(account,userType) {
    $.ajax({
        type: "POST",
        url: "/admin/usertype",
        data: {
            account: account,
            userType: userType
        },
        dataType:"JSON",
        success: function(data){
            var statusCode = data.status;
            if(statusCode == "SUCCESS")
            {
                alert("변경되었습니다");
                self.close();
            }else{
                alert("변경에 실패 하였습니다");
            }
        }
    });
};

$(document).on("click",".submitType",function(){
    var userAccount = $('.userAccount').val();
    var userType = $(".userType option:selected").val();
    updateUserType(userAccount,userType);
});