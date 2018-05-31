function deleteRequest(id) {
  $.ajax({
    type: 'DELETE',
    url: `http://localhost:3000/employee/${id}`
  });
  location.reload();
};
function loadForm() {
  var template = $('#employee-form-template').html();
  $("#employee-form-div").append(template);
  $('#add-employee').remove();
};
