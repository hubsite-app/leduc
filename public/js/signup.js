$(document).ready(function () {
  $('#password, #confirm').on('keyup', function () {
    if ($('#password').val() == $('#confirm').val()) {
      var template = $('#submit-button-template').html();
      $('#submit-button-div').append(template);
      $('#confirm').addClass('validate');
      $('#password').addClass('validate');
    } else 
      $('#submit-button').remove();
  });
});
