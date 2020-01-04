function unescapeHtml(str){
  var map = {amp: '&', lt: '<', le: '≤', gt: '>', ge: '≥', quot: '"', '#039': "'"}
  return str.replace(/&([^;]+);/g, (m, c) => map[c]|| '')
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
  var date2 = new Date(dateConvert(date));

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

function applyTo (link){
  window.open(
    link,
    '_blank' // <- This is what makes it open in a new window.
  );
}

var software = getUrlParameter("software");
var contract = getUrlParameter("contract");
var url = "https://script.google.com/macros/s/AKfycbxmHiRBIhd7ErXuJlm8QiweTth46ZxHKJuNRjMp7EylT9faGw/exec?"+
          "software="+(software != undefined ? software : '')+
          "&contract="+(contract != undefined ? contract : '');

$.getJSON( url, function( data ) {
  $("#loading").remove();
  var count = data['offers'].length;
  if (count > 0) {
    $.each( data, function( key, val ) {
      var items = [];
      $.each( val, function( i_key, job ) {
        items.push('<a href="#collapse'+i_key+'" data-toggle="collapse" class="job-list">'+
                        '<div class="company-logo col-auto" style="width:70px; border-radius:10px; overflow: hidden; padding: 0; margin: 0 15px;">'+
                            '<img src="./assets/images/companies/'+job['company_name'].toLowerCase()+'.png" alt="'+job['company_name']+'">'+
                        '</div>'+
                        '<div class="salary-type col-auto order-sm-3">'+
                            '<span class="salary-range">'+dateSince(job['date'])+'</span>'+
                            '<span class="badge" style="border:solid 1px black; font-size:16px;" onClick="addFilter(\'software\', \''+job['framework']+'\');">'+job['framework']+'</span>'+
                        '</div>'+
                        '<div class="salary-type col-auto order-sm-3">'+
                            '<span class="badge" id="apply'+i_key+'">'+
                              '<button type="button" class="btn btn-primary" onClick="applyTo(\''+job['submission']+'\');">Apply</button>'+
                            '</span>'+
                        '</div>'+
                        '<div class="content col">'+
                            '<h6 class="title">'+job['title']+'</h6>'+
                            '<ul class="meta">'+
                                '<li><strong class="text-primary" onClick="addFilter(\'contract\', \''+job['contract']+'\');">'+job['contract']+'</strong></li>'+
                                '<li><i class="fa fa-map-marker"></i>'+job['location']+'</li>'+
                            '</ul>'+
                        '</div>'+
                    '</a>'+
                  '<div class="collapse" id="collapse'+i_key+'">'+
                    '<div class="card card-body" style="font-size: 16px;">'+unescapeHtml(job['description'])+'<br><a href="'+job['submission']+'" target="_blank" class="btn btn-primary">Apply</a></div>'+
                  '</div>');
      });

      $( ".job-list-wrap" ).append(items.join(""));
    });
  }
  else {
    $( ".job-list-wrap" ).append("<div style='text-align: center; font-size: xx-large;'>No offers found for "+(software != undefined ? "'"+software+"'" : '')+
                                                        (software != undefined && contract != undefined ? " and " : '')+
                                                        (contract != undefined ? "'"+contract+"'" : '')+"</div>");
  }
});
