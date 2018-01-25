(function($){
  $(function(){
    $.getJSON('cnpjs.json').then(function(result) {
      $('input.autocomplete').autocomplete({
        data: result,
        limit: 20,
        minLength: 3, 
      });
    });
  }); 
})(jQuery);     