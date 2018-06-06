$(document).ready(function () {
  $('.crew-dropdown-toggle').dropdown({
    hover: false,
    closeOnClick: false,
    coverTrigger: false,
    constrainWidth: false
  });
  $('.singleCrewSelection').ready(function () {
    if ($('.singleCrewSelection').length) {
      if (history.pushState) {
        var newURL = window.location.protocol + "//" + window.location.host + window.location.pathname + `?crew=${$('.singleCrewSelection').val()}`;
        window.history.pushState({path: newURL}, '', newURL);
      }
      $.each($('.report-link'), function (i, obj) {
        $(obj).attr('href', `/jobreport/${$(obj).attr('id')}/crew/${$('.singleCrewSelection').val()}/report?date=${new Date()}`);
      });
    }
  });
  $('.crew-dropdown-toggle').ready(function () {
    if ($('.crew-dropdown-toggle').length) {
      $('#crew-dropdown input').on('change', function() {  
        if (history.pushState) {
          var newURL = window.location.protocol + "//" + window.location.host + window.location.pathname + `?crew=${$('input[name="crew"]:checked', '#crew-dropdown').val()}`;
          window.history.pushState({path: newURL}, '', newURL);
        } 
        location.reload();
      });
      if ($('input[name="crew"]:checked').length < 1) {
        if (history.pushState) {
          var newURL = window.location.protocol + "//" + window.location.host + window.location.pathname + `?crew=${$('input[name="crew"]', '#crew-dropdown').first().val()}`;
          window.history.pushState({path: newURL}, '', newURL);
        }
        location.reload();
      }
    }
    $.each($('.report-link'), function (i, obj) {
      $(obj).attr('href', `/jobreport/${$(obj).attr('id')}/crew/${$('input[name="crew"]:checked', '#crew-dropdown').val()}/report?date=${new Date()}`);
    });
  });
});