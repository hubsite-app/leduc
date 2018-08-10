$(document).ready(function () {
  $('.employeeDropdown').dropdown({
    hover: false,
    closeOnClick: false,
    coverTrigger: false,
    onCloseEnd: function() {
      location.reload();
    }
  });
  $(document).on('click','.crew-dropdown-select', function(event) {
    event.preventDefault();
    var target = "#" + this.getAttribute('data-target');
    $('html, body').animate({
        scrollTop: $(target).offset().top
    }, 1000);
});
  $('.newCrewMember').click(function () {
    var crewId = $(this).siblings('.id').val();
    var employeeId = $(this).val();
    if ($(this).is(':checked')) {
      $.ajax({
        type: 'POST',
        url: `/crew/${crewId}/employee/${employeeId}`
      });
    } else {
      $.ajax({
        type: 'DELETE',
        url: `/crew/${crewId}/employee/${employeeId}`
      });
    }
  });
  $('.vehicleDropdown').dropdown({
    hover: false,
    closeOnClick: false,
    coverTrigger: false,
    onCloseEnd: function() {
      location.reload();
    }
  });
  $('.crewDropdown').dropdown({
    hover: false,
    closeOnClick: true,
    coverTrigger: false,
    constrainWidth: false,
    onCloseEnd: function () {
      location.reload();
    }
  });
  $('.newCrewVehicle').click(function () {
    var crewId = $(this).siblings('.id').val();
    var vehicleId = $(this).val();
    if ($(this).is(':checked')) {
      $.ajax({
        type: 'POST',
        url: `/crew/${crewId}/vehicle/${vehicleId}`
      });
    } else {
      $.ajax({
        type: 'DELETE',
        url: `/crew/${crewId}/vehicle/${vehicleId}`
      });
    }
  });
});

function editCrewRequest(id, name, type) {
  var template = $('#crew-edit-form-template').html();
  var html = Mustache.render(template, {id, name, type});
  $(`#crew-${id}-content`).remove();
  $(`#crew-${id}-container`).append(html);
  $('input.autocomplete-type').autocomplete({
    data: {
      "Base": null,
      "Paving": null,
      "Concrete": null
    }
  });
};
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
  $('input.autocomplete-type').autocomplete({
    data: {
      "Base": null,
      "Paving": null,
      "Concrete": null
    }
  });
  return false;
};
function loadEmployeeForm() {
  var template = $('#employee-form-template').html();
  $("#employee-form-div").append(template);
  $('#add-employee').remove();
  $("html, body").animate({ scrollTop: $(document).height() }, "slow");
};
function loadVehicleForm() {
  var template = $('#vehicle-form-template').html();
  $("#vehicle-form-div").append(template);
  $('#add-vehicle').remove();
  $("html, body").animate({ scrollTop: $(document).height() }, "slow");
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