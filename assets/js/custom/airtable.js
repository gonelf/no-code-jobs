MemberStack.onReady.then(function(member) {
   // check if member is logged in
   if (member.loggedIn){
     if(member.record_id != undefined){
       // retrive profile
       getUser(member.record_id, function(json){
         console.log("Success:", JSON.stringify(json));
         console.log(json['Username']);
         $("#Username").val(json['fields']['Username']);
         $("#Email").val(json['fields']['Email']);
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
