$(document).ready(function () {
    $("#Title, #Message").keyup(function () {
        var payloadObject = {
            title: $("#Title").val(),
            body: $("#Message").val()
        };

        $("#Payload").val(JSON.stringify(payloadObject));
    });
});