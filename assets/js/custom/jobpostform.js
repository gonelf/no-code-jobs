jQuery.loadScript = function (url, callback) {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: true
    });
}

$(".cognito").click(function(){
  $.loadScript("https://services.cognitoforms.com/s/nPwE6ocbek6wVFrZxleMwg", function(){
    console.log("loaded");
    Cognito.load("forms", { id: "1" });
  });
});
