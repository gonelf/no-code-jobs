$("#job_tool").on('change', function(){
  if (this.value == "Other"){
    $("#other").show();
  }
  else {
    $("#other").hide();
  }
})

$("#job_description").on('input', function(){
  var length = this.value.length
  if (length > 499) {
    length = 499
    $(this).val(this.value.substring(0, length));
  }
  $("#desc_count").html(499-length+'/499');
});
