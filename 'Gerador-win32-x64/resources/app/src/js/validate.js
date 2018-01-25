(function ($) {
    $("input").keyup(function () {
        if ($("input").hasClass("invalid")) {
            $('#gerarNotas').addClass('disabled');
        } else {
            $('#gerarNotas').removeClass('disabled');
        }
    });
})(jQuery); // end of jQuery name space