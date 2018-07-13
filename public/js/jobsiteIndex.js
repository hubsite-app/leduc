$(document).ready(function () {
  $('.crewDropdown').dropdown({
    hover: false,
    closeOnClick: false,
    coverTrigger: false,
    constrainWidth: false,
    onCloseEnd: function() {
      location.reload();
    }
  });

  $('.newCrew').click(function () {
    var jobId = $(this).siblings('.id').val();
    var crewId = $(this).val();
    if ($(this).is(':checked')) {
      $.ajax({
        type: 'POST',
        url: `/jobsite/${jobId}/crew/${crewId}`
      });
      setTimeout(function(){
        location.reload(true);
      }, 5000);
    } else {
      $.ajax({
        type: 'DELETE',
        url: `/jobsite/${jobId}/crew/${crewId}`
      });
      setTimeout(function(){
        location.reload(true);
      }, 5000);
    }
  });
});

function editRequest(id, name, description, jobcode) {
  var template = $('#jobsite-edit-form-template').html();
  var html = Mustache.render(template, {id, name, description, jobcode});
  $(`#job-${id}-edit-button`).remove();
  $(`#job-${id}-edit-container`).append(html);
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
  $('select').formSelect();
  return false;
};