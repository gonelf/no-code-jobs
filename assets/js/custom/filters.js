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
  urlParams.set(key, value.toLowerCase());
  window.location.search = urlParams;
}

function selectSoftware(e) {
  addFilter("software", e.value);
}

function selectContract(e){
  addFilter("contract", e.value);
}

function checkFilters(){
  var software = getUrlParameter("software");
  var contract = getUrlParameter("contract");

  if (software != "undefined") {
    $("#software").val(software).change();
  }

  if (contract != "undefined") {
    $("#contract").val(contract).change();
  }
}

checkFilters();
