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