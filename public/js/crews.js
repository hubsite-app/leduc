$(document).ready(function () {
  $('.employeeDropdown').dropdown({
    hover: false,
    closeOnClick: false,
    coverTrigger: false
  });
  $('.newEmployee').click(function () {
    var crewId = $(this).siblings('.id').val();
    var employeeId = $(this).val();
    if ($(this).is(':checked')) {
      $.ajax({
        type: 'POST',
        url: `/crew/${crewId}/employee/${employeeId}`
      });
      location.reload(true);
    } else {
      $.ajax({
        type: 'DELETE',
        url: `/crew/${crewId}/employee/${employeeId}`
      });
      location.reload();
    }
  });
});

function deleteRequest(id) {
  $.ajax({
    type: 'DELETE',
    url: `http://localhost:3000/crew/${id}`
  });
  location.reload();
};
function loadForm() {
  var template = $('#crew-form-template').html();
  $("#crew-form-div").append(template);
  $('#add-crew').remove();
};