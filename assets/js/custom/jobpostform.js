jQuery.loadScript = function (url, callback) {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: true
    });
}

var loaded = false;

$("#post_a_job").click(function(){
  if (!loaded) {
    $.loadScript("https://services.cognitoforms.com/s/nPwE6ocbek6wVFrZxleMwg", function(){
      Cognito.load("forms", { id: "1" });
      loaded = true;
      $("#loading_form").remove();
    });
  }
});
