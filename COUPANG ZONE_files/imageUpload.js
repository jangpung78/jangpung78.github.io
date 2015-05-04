$(document).ready(function () {
    $("#viewArea").pastableContenteditable();

    $("#_cancelUpload").on("click", function (event) {
        event.preventDefault();
        imageChangeFlagSetTrue();

        $("#_image").val("");
        $("#_imagePasted").val("");
        $("#viewArea").empty();
    });

    $("#_image").change(function () {
        $("#_imagePasted").val("");
        readURL(this);
        imageChangeFlagSetTrue();
    });

    $("#viewArea").on("pasteImage", function(event, data) {
        $("#viewArea").empty();
        $("#viewArea").append("<img id='previewImage' src='" + data.dataURL + "' alt='preview image'>");
        $("#_image").val("");
        $("#_imagePasted").val(data.dataURL);
        imageChangeFlagSetTrue();
    });
});

function imageChangeFlagSetTrue() {
    var isImageChanged = $("#isImageChanged");

    if (isImageChanged.length) {
        isImageChanged.val("true");
    }
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (event) {
            $("#previewImage").remove();

            $("<img/>", {
                id: "previewImage",
                src: event.target.result,
                alt: "preview image"
            }).appendTo("#viewArea")
        }

        reader.readAsDataURL(input.files[0]);
    }
}
