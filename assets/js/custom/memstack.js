function updateRegisterId (member, obj) {
   member.updateProfile(obj, false)
}
MemberStack.onReady.then(function(member) {
   // check if member is logged in
   console.log(member.loggedIn);
   if (member.loggedIn){
     $("#ms-warning-box").hide();
   }
})
