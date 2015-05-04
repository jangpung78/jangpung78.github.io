$(document).ready(function () {
    function GetURLParameter(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++)
        {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam)
            {
                return sParameterName[1];
            }
        }
    }
    function checkDate(selectDate){
        var urlParam = GetURLParameter("saveDate");
        if(urlParam==null)
        {
            return moment();
        }
        return moment(urlParam.split('%7E')[selectDate]);
    }

    function checkDateSingle(selectDate){
        if(selectDate=="")
        {
            return moment();
        }
        return moment(selectDate);
    }

    $('.input-group.date#_startCalendar').html(checkDateSingle($("#_startDate").val()).format('YYYY-MM-DD'));
    $('.input-group.date#_startDate').val(checkDateSingle($("#_startDate").val()).format('YYYY-MM-DD'));;
    $('.input-group.date#_startCalendar').daterangepicker(
        {
            format: 'YYYY-MM-DD',
            startDate: checkDateSingle($("#_startDate").val()),
            endDate: checkDateSingle($("#_startDate").val()),
            singleDatePicker: true
        },
        function (start, end, label) {
            $('.input-group.date#_startCalendar').html(start.format('YYYY-MM-DD'));
            $('.input-group.date#_startDate').val(start.format('YYYY-MM-DD'));
        }
    );
    $('.input-group.date#_endCalendar').html(checkDateSingle($("#_endDate").val()).format('YYYY-MM-DD'));
    $('.input-group.date#_endDate').val(checkDateSingle($("#_endDate").val()).format('YYYY-MM-DD'));
    $('.input-group.date#_endCalendar').daterangepicker(
        {
            format: 'YYYY-MM-DD',
            startDate: checkDateSingle($("#_endDate").val()),
            endDate: checkDateSingle($("#_endDate").val()),
            singleDatePicker: true
        },
        function (start, end, label) {
            $('.input-group.date#_endCalendar').html(start.format('YYYY-MM-DD'));
            $('.input-group.date#_endDate').val(start.format('YYYY-MM-DD'));;
        }
    );

    $('#reportrange2 span').html(checkDate(0).format('YYYY-MM-DD') + ' - ' + checkDate(1).format('YYYY-MM-DD'));
    $('#reportrange2 input').attr('value', checkDate(0).format('YYYY-MM-DD') + '~' + checkDate(1).format('YYYY-MM-DD'));
    $('#reportrange2').daterangepicker(
        {
            format: 'YYYY-MM-DD',
            startDate: checkDate(0),
            endDate: checkDate(1)
        },
        function (start, end, label) {
            $('#reportrange2 span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
            $('#reportrange2 input').attr('value', start.format('YYYY-MM-DD') + '~' + end.format('YYYY-MM-DD'));
        }
    );
});