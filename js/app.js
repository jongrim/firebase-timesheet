var config = {
  apiKey: 'AIzaSyAXhyjbcASczI4rVE6E1WU2MdyrzNWPy7g',
  authDomain: 'employee-tracker-53f2b.firebaseapp.com',
  databaseURL: 'https://employee-tracker-53f2b.firebaseio.com',
  projectId: 'employee-tracker-53f2b',
  storageBucket: 'employee-tracker-53f2b.appspot.com',
  messagingSenderId: '833134720238'
};
firebase.initializeApp(config);

var database = firebase.database();

$(document).ready(function() {
  // DOM elements
  var $employeeName = $('#employeeName');
  var $role = $('#role');
  var $startDate = $('#startDate');
  var $monthlyRate = $('#monthlyRate');
  var $addEmployeeBtn = $('#addEmployeeBtn');
  var $employeeTableBody = $('#employeeDataTableBody');
  var $hideForm = $('#hideForm');

  $hideForm.on('click', function() {
    $('#addEmployeeForm').slideToggle();
    if ($hideForm.text().startsWith('Hide')) {
      $hideForm.text('Show Form');
    } else {
      $hideForm.text('Hide Form');
    }
  });

  function makeEmployeeRow(name, role, startDate, monthlyRate, months, totalComp) {
    var $tableRow = $('<tr></tr>');
    var $nameData = $('<td></td>').text(name);
    var $roleData = $('<td></td>').text(role);
    var $startDateData = $('<td></td>').text(startDate);
    var $monthlyRateData = $('<td></td>').text(monthlyRate);
    var $months = $('<td></td>').text(months);
    var $totalComp = $('<td></td>').text(`$${totalComp}`);

    return $tableRow.append([$nameData, $roleData, $startDateData, $monthlyRateData, $months, $totalComp]);
  }

  // Attach listeners
  $addEmployeeBtn.on('click', function(e) {
    e.preventDefault();

    // get values from form fields
    var employeeName = $employeeName.val().trim();
    var role = $role.val().trim();
    var startDate = $startDate.val().trim();
    console.log($startDate.val());
    var monthlyRate = $monthlyRate.val().trim();

    // add values to database
    database.ref().push({
      employeeName: employeeName,
      role: role,
      startDate: startDate,
      monthlyRate: monthlyRate
    });
  });

  database.ref().on(
    'child_added',
    function(snap, prevChildKey) {
      // retrieve values from snapshot
      var name = snap.val().employeeName;
      var role = snap.val().role;
      var startDate = snap.val().startDate;
      var monthlyRate = snap.val().monthlyRate;

      var monthDiff = moment().diff(moment(startDate, 'YYYY-MM-DD'), 'months');

      var totalComp = monthDiff * monthlyRate;

      // add new employee row
      $employeeTableBody.prepend(makeEmployeeRow(name, role, startDate, monthlyRate, monthDiff, totalComp));
    },
    function(errorObject) {
      console.log('Error with database read:', errorObject);
    }
  );
});
