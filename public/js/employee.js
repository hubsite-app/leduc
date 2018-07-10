function editRequest(id, name, jobTitle) {
  var template = $('#employee-edit-form-template').html();
  var html = Mustache.render(template, {id, name, jobTitle});
  $(`#employee-${id}-content`).remove();
  $(`#employee-${id}-container`).append(html);
};
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
  $("html, body").animate({ scrollTop: $(document).height() }, "slow");
  return false;
};