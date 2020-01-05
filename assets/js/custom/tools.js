var url = "https://script.google.com/macros/s/AKfycbxmHiRBIhd7ErXuJlm8QiweTth46ZxHKJuNRjMp7EylT9faGw/exec?sheet=tools";

$.getJSON( url, function( data ) {

  var count = data['data'].length;
  if (count > 0) {
    $.each( data, function( key, val ) {
      var items = [];
      $.each( val, function( i_key, tool ) {

        items.push('<div class="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-12">'+
                        '<a href="company-single.html" class="company-list">'+
                            '<span class="company-logo"><img src="'+tool['logo']+'" style="width: 70px;" alt="company-1"></span>'+
                            '<h6 class="title">'+tool['name']+'</h6>'+
                            //'<span class="open-job">2 open positions</span>'+
                            '<span class="location">'+tool['description']+'</span>'+
                        '</a>'+
                    '</div>');
      });

      $( ".company-list-wrap" ).append(items.join(""));
    });
  }
  else {
    $( ".job-list-wrap" ).append("<div style='text-align: center; font-size: xx-large;'>No offers found for "+(software != undefined ? "'"+software+"'" : '')+
                                                        (software != undefined && contract != undefined ? " and " : '')+
                                                        (contract != undefined ? "'"+contract+"'" : '')+"</div>");
  }
});
