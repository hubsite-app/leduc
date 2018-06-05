$(document).ready(function () {
  $('.crew-dropdown-toggle').dropdown({
    hover: false,
    closeOnClick: false,
    coverTrigger: false,
    constrainWidth: false
  });
  $('.singleCrewSelection').ready(function () {
    if ($('.singleCrewSelection').length) {
      $.each($('.report-link'), function (i, obj) {
        $(obj).attr('href', `/jobreport/${$(obj).attr('id')}/crew/${$('.singleCrewSelection').val()}/report?date=${new Date()}`);
      });
    }
  });
  $('.crew-dropdown-toggle').ready(function () {
    if ($('.crew-dropdown-toggle').length) {
      $('#crew-dropdown input').on('change', function() {
        alert($('input[name="crew"]:checked', '#crew-dropdown').val());
        $.each($('.report-link'), function (i, obj) {
          $(obj).attr('href', `/jobreport/${$(obj).attr('id')}/crew/${$('input[name="crew"]:checked', '#crew-dropdown').val()}/report?date=${new Date()}`);
        });
      });
    }
  });
});