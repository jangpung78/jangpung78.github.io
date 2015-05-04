$(document).ready(function(){
    $('#id').focus();

    $('#loginActionForm').submit(function(event) {
        processLogin();
        event.preventDefault();
    });

    $('#keyboardHelp').toggle();

    $('#keyboardHelpText').click(function() {
        $('#keyboardHelp').toggle();
    });

    $('body')
        .on('click', '#logoutBtn', function(){
            window.location.href = "/check/logout";
        });
});

function processLogin() {
    if (!chkLogin()) {
        return false;
    }

    var userID = $('#id').val();
    var userPassword = $('#pw').val();
    var returnURL = $('#rtnUrl').val();

    $.ajax({
        url: "/check/checkUser",
        type: "POST",
        data: { id: userID, pw: userPassword },
        dataType: "json"
    }).done(function(data) {
        console.log(data);
        if (data.status == "SUCCESS") {
            window.location.href = returnURL;
        } else {
            alert("그룹웨어 ID 또는 패스워드가 잘못 되었습니다.");
        }
    });

    return true;
}

function chkLogin() {
    if($('#id').val()=="") {
        alert("아이디를 입력해주세요.");
        $('#id').focus();
        return false;
    }
    if($('#pw').val()=="") {
        alert("비밀번호를 입력해주세요.");
        $('#pw').focus();
        return false;
    }

    return true;
}