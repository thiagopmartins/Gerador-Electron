$( document ).ready(function() {
    $.getJSON('../cnpjs.json').then(function (data) {
        
        var items = [];
        $.each( data, function( key, val ) {
            items.push( "<li class='collection-item' id='" + key + "'><span>" + val + ' - </span> ' + key + "<a href='' class='secondary-content' id='deleteCnpj'><i class='material-icons'>delete</i></a><a href='' class='secondary-content edit' id='editCnpj'><i class='material-icons'>mode edit</i></a></li>" );
        });
        
        $( "<ul/>", {
            "class": "collection with-header",
            html: items.join( "" )
        }).appendTo( "#listaCnpj" );

    });
});