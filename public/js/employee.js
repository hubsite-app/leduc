function deleteRequest(id) {
  $.ajax({
    type: 'DELETE',
    url: `/employee/${id}`
  });
  location.reload();
};
function loadForm() {
  var template = $('#employee-form-template').html();
  $("#employee-form-div").append(template);
  $('#add-employee').remove();
};
