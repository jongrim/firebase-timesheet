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

  // Attach listeners
  $addEmployeeBtn.on('click', function(e) {
    console.log('hi, I ran');
    e.preventDefault();

    // get values from form fields

    var employeeName = $employeeName.val().trim();
    var role = $role.val().trim();
    var startDate = $startDate.val().trim();
    var monthlyRate = $monthlyRate.val().trim();

    database.ref().push({
      employeeName: employeeName,
      role: role,
      startDate: startDate,
      monthlyRate: monthlyRate
    });
  });

  database.ref().on('child_added', function(snap, prevChildKey) {
    // TODO
  });
});
