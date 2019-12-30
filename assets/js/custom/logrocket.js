if (getUrlParameter("private") != "true") {
  //$("head").append('<script src="https://cdn.lr-ingest.io/LogRocket.min.js" crossorigin="anonymous"></script><script>window.LogRocket && window.LogRocket.init("vs91x2/request-for-product");</script>')
  $.getScript( "https://cdn.lr-ingest.io/LogRocket.min.js", function( data, textStatus, jqxhr ) {
    console.log( "LogRocket" );
    window.LogRocket && window.LogRocket.init("nghdkk/nocodery");
  });
}
