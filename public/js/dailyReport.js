$('document').ready(function() {
  $('select').formSelect();
  $('#employee-form-close').on('click', function() {
    var template = $('#employee-work-form-add-button').html();
    $('#add-employee-work').append(template);
    $('#employee-work-form-div').remove();
  });
});

function loadEditForm() {
  var template = $('#report-edit-form-template').html();
  $('#edit-form-div').append(template);
  $('#edit-button').remove();
  $('.datepicker').datepicker();
  $('select').formSelect();
}

function loadEmployeeForm() {
  var template = $('#employee-work-form-template').html();
  $("#employee-work-form-div").append(template);
  $('#add-employee-work').remove();
  $('input.autocomplete-work').autocomplete({
    data: {
      "Subgrade Prep": null,
      "Pit-run": null,
      "Base Gravel": null,
      "Prime/Tack": null,
      "Paving": null,
      "Utilities": null,
      "Force Account / Extra Work": null,
      "Saw Cut": null,
      "Breakout and Dispose": null,
      "Preperation and Gravel": null,
      "Rebar": null,
      "Forming": null,
      "Hand Pour": null,
      "Slurry": null,
      "String Line": null,
      "Machine Pour": null,
      "Concrete Supply": null,
      "Blackfill and Landscape Rehab": null
    }
  });
  $('.timepicker').timepicker({
    container: '.container'
  });
  $('select').formSelect({dropdownOptions: {
    constrainWidth: false
  }});
  var elem = document.querySelector('.autocomplete-work');
  var instance = M.Autocomplete.getInstance(elem);
  $('input.autocomplete-work').on('click', function () {
    instance.open();
  });
  
};
function removeEmployeeForm() {
  var template = $('#employee-work-form-add-button').html();
  $('#employee-work-button-div').append(template);
  $('#employee-work-form').remove();
};
function loadEmployeeEditForm(id, work, start, end, employeeId) {
  if (start.split(' ').length > 1) {
    start = start.split(' ')[4];
  }
  if (end.split(' ').length > 1) {
    end = end.split(' ')[4];
  }
  var template = $('#employee-work-edit-form-template').html();
  var html = Mustache.render(template, {id, work, start, end, employeeId})
  $("#employee-"+ id +"-work-edit-form-div").append(html);
  $('#employee-work-'+ id +'-edit-button').remove();
  $('input.autocomplete-work').autocomplete({
    data: {
      "Subgrade Prep": null,
      "Pit-run": null,
      "Base Gravel": null,
      "Prime/Tack": null,
      "Paving": null,
      "Utilities": null,
      "Force Account / Extra Work": null,
      "Saw Cut": null,
      "Breakout and Dispose": null,
      "Preperation and Gravel": null,
      "Rebar": null,
      "Forming": null,
      "Hand Pour": null,
      "Slurry": null,
      "String Line": null,
      "Machine Pour": null,
      "Concrete Supply": null,
      "Blackfill and Landscape Rehab": null
    }
  });
  $('.timepicker').timepicker({
    container: '.container'
  });
};
function removeEmployeeEditForm(id, jobTitle, startTime, endTime, employeeId) {
  var template = $('#employee-edit-form-button').html();
  var html = Mustache.render(template, {id, jobTitle, startTime, endTime, employeeId});
  $('#employee-work-'+ id +'-div').append(html);
  $('#employee-work-edit-form').remove();
};
function deleteEmployeeWorkRequest(id) {
  $.ajax({
    type: 'DELETE',
    url: `/employeework/${id}`,
    success: function() {
      location.reload(true);
    }
  });
};
function loadExtraEmployeeWork(index, jobTitle, startTime, endTime) {
  var template = $('#extra-employee-work-template').html();
  if (index == 1) {
    if(!startTime) {
      startTime = $('#employee-end-time').val();
    }
    $('#original-employee-work-add-button').remove();
    $('#original-employee-work-div').removeClass('s10 m11').addClass('s12 m12 l12');    
  } else if (index > 1) {
    if (!startTime) {
      startTime = $(`#employee-end-time-${index - 1}`).val();
    }
    $('#employee-work-add-button-' + (index - 1)).remove();
    $('#employee-work-div-' + (index - 1)).removeClass('s10 m11').addClass('s12 m12 l12'); 
  }
  var html = Mustache.render(template, {index, jobTitle, startTime, endTime});
  $('#extra-employee-work-div').append(html);
  $('input.autocomplete-work').autocomplete({
    data: {
      "Subgrade Prep": null,
      "Pit-run": null,
      "Base Gravel": null,
      "Prime/Tack": null,
      "Paving": null,
      "Utilities": null,
      "Force Account / Extra Work": null,
      "Saw Cut": null,
      "Breakout and Dispose": null,
      "Preperation and Gravel": null,
      "Rebar": null,
      "Forming": null,
      "Hand Pour": null,
      "Slurry": null,
      "String Line": null,
      "Machine Pour": null,
      "Concrete Supply": null,
      "Blackfill and Landscape Rehab": null
    }
  });
  $(`.timepicker-${index}`).timepicker({
    container: '.container'
  });
}; 
function loadExtraEmployeeForm(jobs, startTimes, endTimes) {
  var jobTitleArray = jobs.split(',');
  var startTimeArray = startTimes.split(',');
  var endTimeArray = endTimes.split(',');
  var index = jobTitleArray.length;
  for(var i = 0; i < index; i++) {
    loadExtraEmployeeWork(i + 1, jobTitleArray[i], startTimeArray[i], endTimeArray[i]);
  }
}

function loadVehicleForm() {
  var template = $('#vehicle-work-form-template').html();
  $("#vehicle-work-form-div").append(template);
  $('#add-vehicle-work').remove();
  $('input.autocomplete-work').autocomplete({
    data: {
      "Subgrade Prep": null,
      "Pit-run": null,
      "Base Gravel": null,
      "Prime/Tack": null,
      "Paving": null,
      "Utilities": null,
      "Force Account / Extra Work": null,
      "Saw Cut": null,
      "Breakout and Dispose": null,
      "Preperation and Gravel": null,
      "Rebar": null,
      "Forming": null,
      "Hand Pour": null,
      "Slurry": null,
      "String Line": null,
      "Machine Pour": null,
      "Concrete Supply": null,
      "Blackfill and Landscape Rehab": null
    }
  });
  $('.timepicker').timepicker({
    container: '.container'
  });
  $('select').formSelect({dropdownOptions: {
    constrainWidth: false
  }});
};
function removeVehicleForm() {
  var template = $('#vehicle-work-form-add-button').html();
  $('#vehicle-work-button-div').append(template);
  $('#vehicle-work-form').remove();
};
function loadVehicleEditForm(id, work, start, end, vehicleId, hours) {
  if (start && end) {
    hours = Math.round(Math.abs(new Date(end) - new Date(start)) / 3.6e6 * 100) / 100
  }
  var template = $('#vehicle-work-edit-form-template').html();
  var html = Mustache.render(template, {id, work, start, end, vehicleId, hours})
  $("#vehicle-"+ id +"-work-edit-form-div").append(html);
  $('#vehicle-work-'+ id +'-edit-button').remove();
  $('input.autocomplete-work').autocomplete({
    data: {
      "Subgrade Prep": null,
      "Pit-run": null,
      "Base Gravel": null,
      "Prime/Tack": null,
      "Paving": null,
      "Utilities": null,
      "Force Account / Extra Work": null,
      "Saw Cut": null,
      "Breakout and Dispose": null,
      "Preperation and Gravel": null,
      "Rebar": null,
      "Forming": null,
      "Hand Pour": null,
      "Slurry": null,
      "String Line": null,
      "Machine Pour": null,
      "Concrete Supply": null,
      "Blackfill and Landscape Rehab": null
    }
  });
  $('.timepicker').timepicker({
    container: '.container'
  });
};
function removeVehicleEditForm(id, jobTitle, startTime, endTime, vehicleId, hours) {
  var template = $('#vehicle-edit-form-button').html();
  var html = Mustache.render(template, {id, jobTitle, startTime, endTime, vehicleId, hours});
  $('#vehicle-work-'+ id +'-div').append(html);
  $('#vehicle-work-edit-form').remove();
};
function deleteVehicleWorkRequest(id) {
  $.ajax({
    type: 'DELETE',
    url: `/vehiclework/${id}`,
    success: function() {
      location.reload(true);
    }
  });
};
function loadExtraVehicleWork(index, jobTitle, hours) {
  var template = $('#extra-vehicle-work-template').html();
  if (index == 1) {
    $('#original-vehicle-work-add-button').remove();
    $('#original-vehicle-hour-div').removeClass('s4 m5').addClass('s6 m6');    
  } else if (index > 1) {
    $('#vehicle-work-add-button-' + (index - 1)).remove();
    $('#vehicle-hours-div-' + (index - 1)).removeClass('s4 m4').addClass('s6 m6'); 
  }
  var html = Mustache.render(template, {index, jobTitle, hours});
  $('#extra-vehicle-work-div').append(html);
  $('input.autocomplete-work').autocomplete({
    data: {
      "Subgrade Prep": null,
      "Pit-run": null,
      "Base Gravel": null,
      "Prime/Tack": null,
      "Paving": null,
      "Utilities": null,
      "Force Account / Extra Work": null,
      "Saw Cut": null,
      "Breakout and Dispose": null,
      "Preperation and Gravel": null,
      "Rebar": null,
      "Forming": null,
      "Hand Pour": null,
      "Slurry": null,
      "String Line": null,
      "Machine Pour": null,
      "Concrete Supply": null,
      "Blackfill and Landscape Rehab": null
    }
  });
  $(`.timepicker-${index}`).timepicker({
    container: '.container'
  });
}; 
function loadExtraVehicleForm(jobs, hours) {
  var jobTitleArray = jobs.split(',');
  var hourArray = hours.split(',');
  var index = jobTitleArray.length;
  for(var i = 0; i < index; i++) {
    loadExtraVehicleWork(i + 1, jobTitleArray[i], hourArray[i]);
  }
}

function loadProductionForm() {
  var template = $('#production-form-template').html();
  $("#production-form-div").append(template);
  $('#add-production').remove();
  $('input.autocomplete-production').autocomplete({
    data: {
      "Subgrade Prep": null,
      "Pit-run": null,
      "Base Gravel - 20mm": null,
      "Subbase Material - 80mm": null,
      "Prime/Tack": null,
      "Paving": null,
      "Utilities": null,
      "Force Account / Extra Work": null,
      "Saw Cut": null,
      "Breakout and Dispose": null,
      "Preperation and Gravel": null,
      "Rebar": null,
      "Forming": null,
      "Hand Pour": null,
      "Slurry": null,
      "String Line": null,
      "Machine Pour": null,
      "Concrete Supply": null,
      "Blackfill and Landscape Rehab": null
    }
  });
  $('.timepicker').timepicker({
    container: '.container'
  });
  $('input.autocomplete-units').autocomplete({
    data: {
      "square meters": null,
      "meters cubed": null,
      "tonnes": null,
      "meters": null,
      "linear meteres": null
    }
  });
};
function removeProductionForm() {
  var template = $('#production-form-add-button').html();
  $('#production-button-div').append(template);
  $('#production-form').remove();
};
function loadProductionEditForm(id, work, quantity, unit, start, end, description) {
  if (start.split(' ').length > 1) {
    start = start.split(' ')[4];
  }
  if (end.split(' ').length > 1) {
    end = end.split(' ')[4];
  }
  var template = $('#production-edit-form-template').html();
  var html = Mustache.render(template, {id, work, quantity, unit, start, end, description})
  $("#production-"+ id +"-edit-form-div").append(html);
  $('#production-'+ id +'-edit-button').remove();
  $('input.autocomplete-shipment').autocomplete({
    data: {
      "Subgrade Prep": null,
      "Pit-run": null,
      "Base Gravel - 20mm": null,
      "Subbase Material - 80mm": null,
      "Prime/Tack": null,
      "Paving": null,
      "Utilities": null,
      "Force Account / Extra Work": null,
      "Saw Cut": null,
      "Breakout and Dispose": null,
      "Preperation and Gravel": null,
      "Rebar": null,
      "Forming": null,
      "Hand Pour": null,
      "Slurry": null,
      "String Line": null,
      "Machine Pour": null,
      "Concrete Supply": null,
      "Blackfill and Landscape Rehab": null
    }
  });
  $('.timepicker').timepicker({
    container: '.container'
  });
};
function removeProductionEditForm(id, work, quantity, unit, start, end, description) {
  var template = $('#production-edit-form-button').html();
  var html = Mustache.render(template, {id, work, quantity, unit, start, end, description});
  $('#production-edit-'+ id +'-div').append(html);
  $('#production-edit-form').remove();
};
function deleteProductionRequest(id) {
  $.ajax({
    type: 'DELETE',
    url: `/production/${id}`,
    success: function() {
      location.reload(true);
    }
  });
};

function loadMaterialForm() {
  var template = $('#material-form-template').html();
  $("#material-form-div").append(template);
  $('#add-material').remove();
  $('input.autocomplete-shipment').autocomplete({
    data: {
      "80mm Crushed Gravel": null,
      "50mm Crushed Gravel": null,
      "25mm Crushed Gravel": null,
      "20mm Screened Rock": null,
      "32 MPa": null,
      "5 MPa": null
    }
  });
  $('input.autocomplete-units').autocomplete({
    data: {
      "meters cubed": null,
      "tonnes": null
    }
  });
  $('.timepicker').timepicker({
    container: '.container'
  });
  $('select').formSelect({dropdownOptions: {
    constrainWidth: false
  }});
};
function removeMaterialForm() {
  var template = $('#material-form-add-button').html();
  $('#material-button-div').append(template);
  $('#material-form').remove();
};
function loadMaterialEditForm(id, shipment, quantity, unit, vehicleId, supplier) {
  var template = $('#material-edit-form-template').html();
  var html = Mustache.render(template, {id, shipment, quantity, unit, vehicleId, supplier})
  $("#material-"+ id +"-edit-form-div").append(html);
  $('#material-'+ id +'-edit-button').remove();
  $('input.autocomplete').autocomplete({
    data: {
      "80mm Crushed Gravel": null,
      "50mm Crushed Gravel": null,
      "25mm Crushed Gravel": null,
      "20mm Screened Rock": null,
      "32 MPa": null,
      "5 MPa": null
    }
  });
  $('input.autocomplete-units').autocomplete({
    data: {
      "meters cubed": null,
      "tonnes": null
    }
  });
  $('.timepicker').timepicker({
    container: '.container'
  });
};
function removeMaterialEditForm(id, shipment, quantity, unit, vehicleId, supplier) {
  var template = $('#material-edit-form-button').html();
  var html = Mustache.render(template, {id, shipment, quantity, unit, vehicleId, supplier});
  $('#material-edit-'+ id +'-div').append(html);
  $('#material-edit-form').remove();
};
function deleteMaterialRequest(id) {
  $.ajax({
    type: 'DELETE',
    url: `/material/${id}`,
    success: function() {
      location.reload(true);
    }
  });
};

function toggleApproval(id) {
  if ($('#report-'+ id + '-approval').is(':checked')) {
    $.ajax({
      type: 'POST',
      url: '/report/' + id + '/approve',
      success: function() {
        location.reload();
      }
    });
  } else {
    $.ajax({
      type: 'POST',
      url: '/report/' + id + '/disapprove',
      success: function() {
        location.reload();
      }
    });
  }
};

function deleteReportRequest(id) {
  $.ajax({
    type: 'DELETE',
    url: `/report/${id}`
  });
};