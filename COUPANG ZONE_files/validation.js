$(document).ready(function () {
    $(".chkOriginalPrice").change(function () {
        checkNumber(this.form.elements['originalPrice']);
    });
    $(".chkStartPrice").change(function () {
        checkNumber(this.form.elements['startPrice']);
    });

    $("#_endDate").change(function () {
        var nowDate = new Date();
        var nowHour = nowDate.getHours();
        var nowMinute = nowDate.getMinutes();
        var nowSecond = nowDate.getSeconds();

        var endTimeForm = this.form.elements['endTime'];
        var endTime = endTimeForm.value;
        var timeArray = endTime.split(":");

        var now = (nowHour * 3600) + (nowMinute * 60) + (nowSecond * 1);

        var end = (timeArray[0] * 3600) + (timeArray[1] * 60) + (timeArray[2] * 1);

        if (now > end) {
            endTimeForm.title = "현재시간 이후를 입력하세요";
            endTimeForm.value = "";
            endTimeForm.focus();
            return false;
        }
    });
    $("#_remark").focus(function () {
        if (this.value == this.defaultValue) {
            this.value = null;
        }
    })
        .blur(function () {
            if (this.value() == null) {
                this.value = this.defaultValue;
            }
        });
    $("#fill_default_time").click(function(event) {
        event.preventDefault();
        $("#_startTime").val("11:00:00");
        $("#_endTime").val("14:00:00");
    })
});
function checkNumber(check_form) {
    var numPattern = /([^0-9])/;
    var numPattern = check_form.value.match(numPattern);
    if (numPattern != null) {
        check_form.title = "숫자만 입력하세요";
        check_form.value = "";
        check_form.focus();
        return false;
    }
}