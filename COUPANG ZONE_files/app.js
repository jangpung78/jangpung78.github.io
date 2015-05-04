$(function () {
    if (location.href.match(/^file:/)) {
        $('#examples-warning').show();
    }

    $('input.demo').fileValidator({
        onValidation: function (files) {
            $(this).attr('class', '');
            $("#viewArea").show();
        },
        onInvalid: function (type, file) {
            $(this).addClass('invalid ' + type);
            $(this).val("");
            $("#viewArea").hide();
        }
    });

});