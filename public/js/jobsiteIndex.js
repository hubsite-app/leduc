$(document).ready(function () {
  $('.crewDropdown').dropdown({
    hover: false,
    closeOnClick: false,
    coverTrigger: false
  });

  $('.newCrew').click(function () {
    var jobId = $(this).siblings('.id').val();
    var crewId = $(this).val();
    if ($(this).is(':checked')) {
      $.ajax({
        type: 'POST',
        url: `/jobsite/${jobId}/crew/${crewId}`
      });
      location.reload(true);
    } else {
      $.ajax({
        type: 'DELETE',
        url: `/jobsite/${jobId}/crew/${crewId}`
      });
      location.reload(true);
    }
  });
});

function editRequest(id, name, description, jobcode) {
  var template = $('#jobsite-edit-form-template').html();
  var html = Mustache.render(template, {id, name, description, jobcode});
  $(`#job-${id}-content`).remove();
  $(`#job-${id}-container`).append(html);
};
function deleteRequest(id) {
  $.ajax({
    type: 'DELETE',
    url: `http://localhost:3000/jobsite/${id}`
  });
  location.reload();
};
function loadForm() {
  var template = $('#jobsite-form-template').html();
  $("#jobsite-form-div").append(template);
  $('#add-jobsite').remove();
};