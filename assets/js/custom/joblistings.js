function unescapeHtml(str){
  var map = {amp: '&', lt: '<', le: '≤', gt: '>', ge: '≥', quot: '"', '#039': "'"}
  return str.replace(/&([^;]+);/g, (m, c) => map[c]|| '')
}

function p_to_br(content){
  return content.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '<br /><br />');
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

function convertSubject(content){
  return strip_tags(unescapeHtml(p_to_br(content)), "br")
}

function dateInvert(date){
  var parts = date.split("/");
  return parts.reverse().join("/");
}

function dateConvert(date) {
  var months = {
    "January": 1,
    "Fabruary": 2,
    "March": 3,
    "April": 4,
    "May": 5,
    "June": 6,
    "July": 7,
    "August": 8,
    "September": 9,
    "October": 10,
    "November": 11,
    "December": 12
  }
  var parts = date
          .replace(",", "")
          .split(" ")

  if (parts.length > 1) {
    return parts[2]+"-"+months[parts[0]]+"-"+parts[1]
  }
  return dateInvert(date);
}


function dateSince(date){
  var date1 = new Date();
  var date2 = new Date(date);

  // To calculate the time difference of two dates
  var Difference_In_Time = date1 - date2.getTime();

  // To calculate the no. of days between two dates
  var Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));

  //To display the final no. of days (result)
  // console.log(Difference_In_Days);
  var result = ""
  switch (Difference_In_Days){
    case 0:
      result = "Today"
      break;
    case 1:
      result = "Yesterday"
      break;
    default:
      result = Difference_In_Days+" Days ago"

  }
  return result
}

function applyTo (link, id){
  logJob("apply", id, link);
  var parts = link.split("?");
  var connector = ((parts.length > 0) ? "&" : "?");
  console.log(link+connector+"ref=nocodery.com");
  //link += connector+"ref=nocodery.com";

  window.open(
    link,
    '_blank' // <- This is what makes it open in a new window.
  );
}

function gen_logo (image, company_name) {
  var colors = ["#55efc4", "#00b894", "#ffeaa7", "#fdcb6e", "#00cec9", "#fab1a0", "#e17055", "#0984e3", "#ff7675", "#d63031", "#74b9ff", "#a29bfe"];
  var color = colors[Math.floor(Math.random()*colors.length)]
  if (image != ""){
    return '<img src="'+image+'" alt="'+company_name+'">';
  }
  else {
    return '<div class="avatar-circle" style=\'background-color: '+color+'\'><span class="initials">'+company_name.substring(0, 2)+'</span></div>';
  }
}

function gen_contract (contract){
  if (contract.toLowerCase() != "unknown"){
    var contracts = contract.split(", ");
    var items = [];
    $.each(contracts, function(key, val){
      items.push('<li><strong class="text-primary" onClick="addFilter(\'contract\', \''+val+'\');">'+val+'</strong></li>')
    })
    return items.join("");
  }
  else {
    return '';
  }
}

function pagination (page, total){
  var jobs_per_page = 30;
  var pages = [];
  if (page-2 > 0) pages.push(page-2)
  if (page-1 > 0) pages.push(page-1)
  if (page > 0) pages.push(page)
  if ((page+1)*jobs_per_page <= total+jobs_per_page) pages.push(page+1)
  if ((page+2)*jobs_per_page <= total+jobs_per_page) pages.push(page+2)

  $.each(pages, function(key, _page){
    if (key == 0 && _page > 1){
      $(".pagination").append('<li class="page-item"><a class="page-link" onClick="jumpToPage('+(parseInt(page)-1)+')";><i class="fa fa-angle-left"></i></a></li>');
    }

    $(".pagination").append('<li class="page-item '+(page == _page ? "active" : "")+'"><a class="page-link" onClick="jumpToPage('+_page+')";>'+_page+'</a></li>');

    if (key == pages.length-1 && _page*jobs_per_page < total){
      $(".pagination").append('<li class="page-item"><a class="page-link" onClick="jumpToPage('+(parseInt(page)+1)+')";><i class="fa fa-angle-right"></i></a></li>');
    }
  })
}

function jumpToPage(page){
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set("page", parseInt(page));
  window.location.search = urlParams;
}

function loadJobs(url, paginate, removeLoading, boosted) {
  $.getJSON( url, function( data ) {
    var count = data['data'].length;
    if(removeLoading) $("#loading").remove();
    if (count > 0) {
      // $.each( data['data'], function( key, val ) {
        var items = [];
        $.each( data['data'], function( i_key, job ) {
          var logo = gen_logo(job['company_logo'], job['company_name'])
          var show_boosted = (boosted) ? '<div style="right: 2px; bottom: 2px; text-align: center; position: absolute; color: green;">boosted</div>' : '';
          items.push('<a id="job'+job['id']+'" href="#collapse'+job['id']+'" data-toggle="collapse" class="job-list">'+
                          '<div class="company-logo col-auto" style="width:70px; border-radius:10px; overflow: hidden; padding: 0; margin: 0 15px;">'+
                              logo+
                          '</div>'+
                          show_boosted+
                          '<div class="salary-type col-auto order-sm-3">'+
                              '<span class="salary-range">'+dateSince(job['date'])+'</span>'+
                              '<span class="badge" style="border:solid 1px black; font-size:16px;" onClick="addFilter(\'software\', \''+job['framework']+'\');">'+job['framework']+'</span>'+
                          '</div>'+
                          '<div class="salary-type col-auto order-sm-3">'+
                              '<span class="badge" id="apply'+i_key+'">'+
                                '<button type="button" class="btn btn-primary" onClick="applyTo(\''+job['submission']+'\', \''+job['id']+'\');">Apply</button>'+
                              '</span>'+
                          '</div>'+
                          '<div class="content col">'+
                              '<h6 class="title">'+job['title']+'</h6>'+
                              '<ul class="meta">'+
                                  gen_contract(job['contract'])+
                                  '<li><i class="fa fa-map-marker"></i>'+job['location']+'</li>'+
                              '</ul>'+
                          '</div>'+
                      '</a>'+
                    '<div class="collapse" id="collapse'+job['id']+'">'+
                      '<div class="card card-body" style="font-size: 16px;">'+
                        convertSubject(job['description'])+
                        '<div class="text-center" style="margin: 30px 0px;"><a href="#" onClick="applyTo(\''+job['submission']+'\', \''+job['id']+'\');" target="_blank" class="btn btn-primary" style="width: 200px;">Apply</a></div>'+
                      '</div>'+
                    '</div>');
        });

        $( ".job-list-wrap" ).append(items.join(""));

        if (job != undefined && job != ""){
          var scroll = $("#job"+job).offset()['top'];
          $('html, body').animate({
              scrollTop: $("#job"+job).offset()['top']
          }, 2000);
          $("#job"+job).click();
        }

        if (paginate) pagination(parseInt(data['page'])+1, data['total']);
      // });
    }
    else {
      $( ".job-list-wrap" ).append("<div style='text-align: center; font-size: xx-large;'>No offers found for "+(software != undefined ? "'"+software+"'" : '')+
                                                          (software != undefined && contract != undefined ? " and " : '')+
                                                          (contract != undefined ? "'"+contract+"'" : '')+"</div>");
    }
  });
}

var page = getUrlParameter("page");

// load featured
if(page < 2 || page == undefined || page == "") {
  loadJobs("https://script.google.com/macros/s/AKfycbxmHiRBIhd7ErXuJlm8QiweTth46ZxHKJuNRjMp7EylT9faGw/exec?sheet=featured", false, false, true);
}

// load regular
var software = getUrlParameter("software");
var contract = getUrlParameter("contract");

var job = getUrlParameter("job");

var url = "https://script.google.com/macros/s/AKfycbxmHiRBIhd7ErXuJlm8QiweTth46ZxHKJuNRjMp7EylT9faGw/exec?sheet=crawler&"+
          "software="+(software != undefined ? software : '')+
          "&contract="+(contract != undefined ? contract : '')+
          "&page="+(page != undefined ? page-1 : 0);

loadJobs(url, true, true, false);



$("body").on("click", ".job-list", function(){
  if ($(this).css("background-color") != "rgb(173, 216, 230)"){
    $(this).css("background-color", "rgb(173, 216, 230)")
  }
  else {
    $(this).css("background-color", "rgba(0, 0, 0, 0)")
  }
})
