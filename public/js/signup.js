$(document).ready(function () {
  $('#password, #confirm').on('keyup', function () {
    if ($('#password').val() == $('#confirm').val() && $('#confirm').val() != '') {
      $('#submit-button').removeClass('disabled');
      $('#confirm').addClass('validate');
      $('#password').addClass('validate');
    } else 
      $('#submit-button').addClass('disabled');
  });
});
