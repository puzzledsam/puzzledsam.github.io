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
  var $stepGoal = $('#stepGoal');
  var $idleAlert = $('#idleAlert');
  var $stepGoalSlider = $('#stepGoalSlider');

  if (localStorage.stepGoal) {
    $stepGoal[0].value = localStorage.stepGoal;
    $idleAlert[0].checked = localStorage.idleAlert === 'true';
    $stepGoalSlider[0].value = localStorage.stepGoalSlider;
  }
}

function getAndStoreConfigData() {
  var $stepGoal = $('#stepGoal');
  var $idleAlert = $('#idleAlert');
  var $stepGoalSlider = $('#stepGoalSlider');

  var options = {
    stepGoal: $stepGoal.val(),
    idleAlert: $idleAlert[0].checked,
    stepGoalSlider: $stepGoalSlider.val()
  };

  localStorage.stepGoal = options.stepGoal;
  localStorage.idleAlert = options.idleAlert;
  localStorage.stepGoalSlider = options.stepGoalSlider;

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
