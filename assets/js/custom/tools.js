function unescapeHtml(str){
  var map = {amp: '&', lt: '<', le: '≤', gt: '>', ge: '≥', quot: '"', '#039': "'"}
  return str.replace(/&([^;]+);/g, (m, c) => map[c]|| '')
}

function strip_tags( _html /*you can put each single tag per argument*/ )
{
    var _tags = [], _tag = "" ;
    for( var _a = 1 ; _a < arguments.length ; _a++ )
    {
        _tag = arguments[_a].replace( /<|>/g, '' ).trim() ;
        if ( arguments[_a].length > 0 ) _tags.push( _tag, "/"+_tag );
    }

    if ( !( typeof _html == "string" ) && !( _html instanceof String ) ) return "" ;
    else if ( _tags.length == 0 ) return _html.replace( /<(\s*\/?)[^>]+>/g, "" ) ;
    else
    {
        var _re = new RegExp( "<(?!("+_tags.join("|")+")\s*\/?)[^>]+>", "g" );
        return _html.replace( _re, '' );
    }
}

function populateTool(tool) {
  $("#title").html("About "+tool['name']);
  $("#overview").html(strip_tags(unescapeHtml(tool['overview']), "br"));
  $("#box_title").html(tool['name']);
  $("#hero_title").html("#nocode tool - "+tool['name'])
  $("#tool_logo").attr('src', tool['logo']);
  $("#tool_logo").attr('alt', tool['name']);
  $("#tags").html(tool['tags'].split(",").join(", "));
  $("#link").attr('href', tool['url']);
  $("#link").html(tool['url']);
  $(".rich-text-block-12").show();
  $(".div-block-159").hide();
  $("#tool").show();
  if (tool['verified'] == true) $("#tool_sidebar").prepend("<li><img src='./assets/images/custom/verified.png' style='width: 22px; margin-bottom: 5px;' /> <b>Verified</b></li>")
  var images = tool['images'].split(",");
  $.each(images, function(key, image){
    $("#images").append(
      '<a href="#" class="pop">'+
        '<div style="border: 1px solid #EDEDED; padding: 25px; margin: 5px;">'+
          '<img id="imageresource" src="'+image+'" style="width: 200px;">'+
        '</div>'+
      '</a>');
  })
}

$("body").on("click", "a.pop", function() {
   $('#imagepreview').attr('src', $(this).find('#imageresource').attr('src')); // here asign the image to the modal when the user click the enlarge link
   $('#imagemodal').modal('show'); // imagemodal is the id attribute assigned to the bootstrap modal, then i use the show function
});

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
        var verified = (tool['verified'] == true) ? '<div style="position: absolute; top: -23px; right: -7px;"><img src="./assets/images/custom/verified.png" alt="verified"></div>' : '' ;

        items.push('<div class="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-12">'+
                        '<a href="tool.html?tool='+tool['name']+'" class="company-list" onClick="log(\'tool\', {\'name\': \''+tool['name']+'\'})">'+
                            '<span class="company-logo"><img src="'+tool['logo']+'" style="width: 70px;" alt="company-1"></span>'+
                            '<h6 class="title">'+tool['name']+'</h6>'+
                            //'<span class="open-job">2 open positions</span>'+
                            '<span class="location">'+tool['description']+'</span>'+
                        '</a>'+
                        verified+
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
