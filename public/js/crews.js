$(document).ready(function () {
  $('.employeeDropdown').dropdown({
    hover: false,
    closeOnClick: false,
    coverTrigger: false
  });
  $('.newCrewMember').click(function () {
    var crewId = $(this).siblings('.id').val();
    var employeeId = $(this).val();
    if ($(this).is(':checked')) {
      $.ajax({
        type: 'POST',
        url: `/crew/${crewId}/employee/${employeeId}`,
        timeout: 5000,
        success: function () {
          location.reload(true);
        }
      });
    } else {
      $.ajax({
        type: 'DELETE',
        url: `/crew/${crewId}/employee/${employeeId}`,
        timeout: 5000,
        success: function () {
          location.reload(true);
        }
      });
    }
  });
  $('.vehicleDropdown').dropdown({
    hover: false,
    closeOnClick: false,
    coverTrigger: false
  });
  $('.newCrewVehicle').click(function () {
    var crewId = $(this).siblings('.id').val();
    var vehicleId = $(this).val();
    if ($(this).is(':checked')) {
      $.ajax({
        type: 'POST',
        url: `/crew/${crewId}/vehicle/${vehicleId}`,
        success: function() {
          location.reload(true);
        }
      });
    } else {
      $.ajax({
        type: 'DELETE',
        url: `/crew/${crewId}/vehicle/${vehicleId}`,
        success: function() {
          location.reload(true);
        }
      });
    }
  });
});

function deleteRequest(id) {
  $.ajax({
    type: 'DELETE',
    url: `/crew/${id}`,
    success: function() {
      location.reload(true);
    } 
  });
};
function loadForm() {
  var template = $('#crew-form-template').html();
  $("#crew-form-div").append(template);
  $('#add-crew').remove();
};
function loadEmployeeForm() {
  var template = $('#employee-form-template').html();
  $("#employee-form-div").append(template);
  $('#add-employee').remove();
};
function loadVehicleForm() {
  var template = $('#vehicle-form-template').html();
  $("#vehicle-form-div").append(template);
  $('#add-vehicle').remove();
  $(document).ready(function() {
    $('#rental-toggle').click(function () {
      var template = $('#source-company-form-template').html();
      if ($(this).is(':checked')) {
        $('#source-company-div').append(template);
      } else  {
        $('#source-company-form').remove();
      }
    });
  });
};