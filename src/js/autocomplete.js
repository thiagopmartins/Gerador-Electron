(function ($) {
  $(function () {

    var window_width = $(window).width();

    $('input.autocomplete').autocomplete({
      data: { "06255692000103": 'NDD', "10280765000186": 'Tumelero', "42274696004262": 'Adidas', "02043800000115": 'Pro Audio', "47508411022559": 'GPA' },
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space