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

function addFilter (key, value){
  const urlParams = new URLSearchParams(window.location.search);
  if ((!urlParams.has(key) || value != $("#"+key).val()) && value != "") {
    urlParams.set(key, value.toLowerCase());
    window.location.search = urlParams;
  }
}

function removeFilter(key, value){
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has(key)) {
    urlParams.delete(key);
    window.location.search = urlParams;
  }
}

function selectSoftware(e) {
  var val = e.value;
  if (val != ""){
    addFilter("software", val);
  }
  else {
    removeFilter("software", val)
  }
}

function selectContract(e){
  var val = e.value;
  if (val != ""){
    addFilter("contract", val);
  }
  else {
    removeFilter("contract", val)
  }
}

function checkFilters(){
  var software = getUrlParameter("software");
  var contract = getUrlParameter("contract");

  if (software != "undefined" && software != $("#software").val()) {
    $("#software").val(software).change();
  }

  if (contract != "undefined" && contract != $("#contract").val()) {
    $("#contract").val(contract).change();
  }
}

checkFilters();

$("#software").change(function(){
  selectSoftware(this);
});

$("#contract").change(function(){
  selectContract(this);
});
