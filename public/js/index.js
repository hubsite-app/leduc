$(document).ready(function () {
  $('#singleCrewSelection').ready(function () {
    if ($('#singleCrewSelection').length) {
      if (history.pushState) {
        var newURL = window.location.protocol + "//" + window.location.host + window.location.pathname + `?crew=${$('#singleCrewSelection').val()}`;
        window.history.pushState({path: newURL}, '', newURL);
        if(!$('#crewIdCheck').length) {
          location.reload();
        }
      }
      $.each($('.report-link'), function (i, obj) {
        $(obj).attr('href', `/jobreport/${$(obj).attr('id')}/crew/${$('#singleCrewSelection').val()}/report?date=${new Date()}`);
      });
    }
  });
  $('.crew-dropdown-toggle').dropdown({
    hover: false,
    closeOnClick: false,
    coverTrigger: false,
    constrainWidth: false
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
      $.each($('.report-link'), function (i, obj) {
        $(obj).attr('href', `/jobreport/${$(obj).attr('id')}/crew/${$('input[name="crew"]:checked', '#crew-dropdown').val()}/report?date=${new Date()}`);
      });
    }
  });
  $('.report-form-dropdown').dropdown({
    hover: false,
    closeOnClick: false,
    coverTrigger: false,
    constrainWidth: false
  });
  $('.datepicker').datepicker({
    container: '.container',
    showClearBtn: true,
    onOpen: function () {
      $('.report-form-dropdown').dropdown('close');
    },
    onClose: function () {
      $('.report-form-dropdown').dropdown('open');
    }
  });
});