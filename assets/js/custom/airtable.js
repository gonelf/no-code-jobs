MemberStack.onReady.then(function(member) {
   // check if member is logged in
   if (member.loggedIn){
     if(member.record_id != undefined){
       // retrive profile
       getUser(member.record_id, function(json){
         console.log("Success:", JSON.stringify(json));
         $("#Username").val(json['Username']);
         $("#Email").val(json['Email']);
       })
     }
     else {
       // create profile
       registerUser(member, function(recodr_id){
         member.updateProfile({"record_id": record_id}, false)
       });
     }
   }
});
