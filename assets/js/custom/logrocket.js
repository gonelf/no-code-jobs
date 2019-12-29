var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

if (getUrlParameter("private") != "true") {
  //$("head").append('<script src="https://cdn.lr-ingest.io/LogRocket.min.js" crossorigin="anonymous"></script><script>window.LogRocket && window.LogRocket.init("vs91x2/request-for-product");</script>')
  $.getScript( "https://cdn.lr-ingest.io/LogRocket.min.js", function( data, textStatus, jqxhr ) {
    console.log( "LogRocket" );
    window.LogRocket && window.LogRocket.init("nghdkk/nocodery");
  });
}
