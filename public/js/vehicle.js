function deleteRequest(id) {
  $.ajax({
    type: 'DELETE',
    url: `/vehicle/${id}`
  });
  location.reload();
};
function loadForm() {
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
