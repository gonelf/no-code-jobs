MemberStack.onReady.then(function(member) {
   // check if member is logged in
   if (member.loggedIn){
     if(member.record_id != undefined){
       // retrive profile
       getUser(member.record_id, function(json){
         console.log("Success:", JSON.stringify(json));
         console.log(json['fields']['Username']);
         $("#Username").val(json['fields']['Username']);
         $("#Email").val(json['fields']['Email']);
         $("#record_id").val(json['fields']['record_id'])
         //$("#profile").attr("action", "https://www.formnano.com/forms/e0aec00f-e900-4ee5-b1ff-6c1ee19de337?record_id="+json['fields']['record_id'])
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

$("#profile").submit(function(e){
  e.preventDefault();
  var values = $(this).serializeArray();
  var record = {};
  $.each(values, function(i, value){
    record[value.name] = value.value;
  })
  updateRecord(record, function(result){
    console.log(result);
  })
})
