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

function filterFormOn () {
  var template = $('#filter-form-template').html();
  $('#filter-form-container').append(template);
  if (window.location.href.includes('date')) {
    $('#filter-date-select-label').addClass('active');
  }
  $('select').formSelect();
  $('.filterdatepicker').datepicker( {
    showClearBtn: true
  });
  $('#filter-toggle').attr("onclick", "filterFormOff()");
  $('#filter-job-select').on('change', function () {
    var date = "", index;
    if (window.location.href.includes('date')) {
      date = `&date=${encodeURIComponent($('#filter-date-select').val())}`
    }
    for (var i in $('#filter-job-select').val()) {
      if (i < 1) {
        if (history.pushState) {
          var newURL = window.location.protocol + "//" + window.location.host + window.location.pathname + 
                       '?crew=' + window.location.search.substring(1).split('=')[1].split('&')[0] + 
                       '&jobs[]=' + $('#filter-job-select').val()[i];
          window.history.pushState({path: newURL}, '', newURL);
        } 
      } else {
        window.history.pushState({}, '', window.location.href + '&jobs[]=' + $('#filter-job-select').val()[i]);
      }
    }
    if (date) {
      window.history.pushState({}, '', window.location.href + date);
    }
    if ($('#filter-job-select').val().length < 1) {
      var newURL = window.location.protocol + "//" + window.location.host + window.location.pathname + 
                   '?crew=' + window.location.search.substring(1).split('=')[1].split('&')[0] + date;
      window.history.pushState({path: newURL}, '', newURL);
    }
    location.reload();
  });
  $('#filter-date-select').on('change', function () {
    if ($('#filter-date-select').val()) {
      if (window.location.href.includes('date')) {
        var newURL = window.location.href.split('date')[0].slice(0, -1) +
                     `&date=${encodeURIComponent($('#filter-date-select').val())}`;
        window.history.pushState({path: newURL}, '', newURL);
      } else {
        var newURL = window.location.href + `&date=${encodeURIComponent($('#filter-date-select').val())}`;
        window.history.pushState({path: newURL}, '', newURL);
      }
    } else {
      var index = window.location.href.search('date');
      var newURL = window.location.href.replace(window.location.href.slice(index - 1, window.location.href.length), '');
      window.history.pushState({path: newURL}, '', newURL);
    }
    location.reload();
  });
}

function filterFormOff () {
  $('#filter-form').remove();
  $('#filter-toggle').attr("onclick", "filterFormOn()");
}