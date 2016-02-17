(function() {
  loadOptions();
  submitHandler();
})();

function submitHandler() {
  var $submitButton = $('#submitButton');

  $submitButton.on('click', function() {
    console.log('Submit');

    var return_to = getQueryParam('return_to', 'pebblejs://close#');
    document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
  });
}

function loadOptions() {
  var $stepGoalAmount = $('#stepGoalAmount');
  var $idleAlertToggle = $('#idleAlertToggle');

  if (localStorage.stepGoal) {
    $stepGoalAmount[0].value = localStorage.stepGoal;
    $idleAlertToggle[0].checked = localStorage.idleAlert === 'true';
  }
}

function getAndStoreConfigData() {
  var $stepGoalAmount = $('#stepGoalAmount');
  var $idleAlertToggle = $('#idleAlertToggle');

  var options = {
    stepGoal: $stepGoalAmount.val(),
    idleAlert: $idleAlertToggle[0].checked
  };

  localStorage.stepGoal = options.stepGoal;
  localStorage.idleAlert = options.idleAlert;

  console.log('Got options: ' + JSON.stringify(options));
  return options;
}

function getQueryParam(variable, defaultValue) {
  var query = location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (pair[0] === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return defaultValue || false;
}
