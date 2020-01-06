function populateTool(tool) {
  console.log(tool);
  $("#title").html("About "+tool['name']);
  $("#overview").html(tool['overview']);
  $("#box_title").html(tool['title']);
  $("#tool_logo").attr('src', tool['logo']);
  $("#tool_logo").attr('alt', tool['name']);
  $("#tags").html(tool['tags'].split(",").join(", "));
  $("#link").attr('href', tool['url']);
  $("#link").html(tool['url']);
  $("#tool").show();
}

var url = "https://script.google.com/macros/s/AKfycbxmHiRBIhd7ErXuJlm8QiweTth46ZxHKJuNRjMp7EylT9faGw/exec?sheet=tools";

$.getJSON( url, function( data ) {

  var count = data['data'].length;
  if (count > 0) {
    $.each( data, function( key, val ) {
      var items = [];
      var tool_param = getUrlParameter("tool");
      var tool_info = {}

      $.each( val, function( i_key, tool ) {

        if (tool_param && tool_param.toLowerCase() == tool['name'].toLowerCase()) tool_info = tool;

        items.push('<div class="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-12">'+
                        '<a href="tool.html?tool='+tool['name']+'" class="company-list">'+
                            '<span class="company-logo"><img src="'+tool['logo']+'" style="width: 70px;" alt="company-1"></span>'+
                            '<h6 class="title">'+tool['name']+'</h6>'+
                            //'<span class="open-job">2 open positions</span>'+
                            '<span class="location">'+tool['description']+'</span>'+
                        '</a>'+
                    '</div>');
      });

      if (Object.keys(tool_info).length > 0) {
        populateTool(tool_info);
      }
      else {
        $( ".company-list-wrap" ).append(items.join(""));
      }
    });
  }
  else {
    $( ".job-list-wrap" ).append("<div style='text-align: center; font-size: xx-large;'>No offers found for "+(software != undefined ? "'"+software+"'" : '')+
                                                        (software != undefined && contract != undefined ? " and " : '')+
                                                        (contract != undefined ? "'"+contract+"'" : '')+"</div>");
  }
});
