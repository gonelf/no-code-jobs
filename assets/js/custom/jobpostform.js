$(".cognito").click(function(){
  $.getScript("https://services.cognitoforms.com/s/nPwE6ocbek6wVFrZxleMwg", function(){
    console.log("loaded");
    Cognito.load("forms", { id: "1" });
  });
});
