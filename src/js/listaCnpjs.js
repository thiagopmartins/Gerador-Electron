$( document ).ready(function() {
    $.getJSON('../cnpjs.json').then(function (data) {
        var i = 0;
        var items = [];
        $.each( data, function( key, val ) {
            items.push( "<li class='collection-item id='listaCnpjPar" + i + "''><span>" + val + ' - </span> ' + key + "<div class='secondary-content deleta' id='cnpjPar" + i + "'><i class='material-icons'>delete</i><input type='hidden' name='cnpj" + i + "' id='cnpj" + i + "' value='" + key + "' /></div><div class='secondary-content edit' id='editCnpj'><i class='material-icons'>mode edit</i></div></li>" );
            i++;
        });
        
        $( "<ul/>", {
            "class": "collection with-header",
            html: items.join( "" )
        }).appendTo( "#listaCnpj" );

    });

});