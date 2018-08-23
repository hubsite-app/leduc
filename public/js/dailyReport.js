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
function loadExtraEmployeeWork(index, jobTitle, startTime, endTime, additional) {
  var template = $('#extra-employee-work-template').html();
  if(!startTime) {
    startTime = $(`#employee-end-time-${additional}-${index}`).val();
  }
  $(`#employee-work-add-button-${additional}-${index}`).remove();
  $(`#employee-work-div-${additional}-${index}`).removeClass('s10 m11').addClass('s12 m12 l12');    
  var html = Mustache.render(template, {index: index + 1, jobTitle, startTime, endTime, additional});
  $(`#extra-employee-work-div-${additional}`).append(html);
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
  $(`.timepicker`).timepicker({
    container: '.container'
  });
}; 
function loadExtraEmployeeForm(jobs, startTimes, endTimes, forms) {
  var jobTitleArray = handleDimensionalArray(jobs);
  var startTimeArray = handleDimensionalArray(startTimes);
  var endTimeArray = handleDimensionalArray(endTimes);
  for (var f = 0; f < forms; f++) {
    var index = jobTitleArray[f].length;
    if (f > 0) {
      loadAdditionalEmployeeWork(f, jobTitleArray[f][0], startTimeArray[f][0], endTimeArray[f][0]);
    }
    for(var i = 1; i < index; i++) {
      loadExtraEmployeeWork(i - 1, jobTitleArray[f][i], startTimeArray[f][i], endTimeArray[f][i],f);
    }
  }
}
function loadAdditionalEmployeeWork(index, jobTitle, startTime, endTime) {
  $('#additional-employee-work-add-button').attr('onclick', `loadAdditionalEmployeeWork(${index + 1});`);
  var template = $('#additional-employee-work-template').html();
  var html = Mustache.render(template, {index, jobTitle, startTime, endTime});
  $('#additional-employee-form-div').append(html);
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
  $(`.timepicker`).timepicker({
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
function loadExtraVehicleWork(index, jobTitle, hours, additional) {
  var template = $('#extra-vehicle-work-template').html();
  $(`#vehicle-work-add-button-${additional}-${index}`).remove();
  $(`#vehicle-hours-div-${additional}-${index}`).removeClass('s4 m5').addClass('s6 m6');    
  var html = Mustache.render(template, {index: index + 1, jobTitle, hours, additional});
  $(`#extra-vehicle-work-div-${additional}`).append(html);
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
}; 
function loadExtraVehicleForm(jobs, hours, forms) {
  var jobTitleArray = handleDimensionalArray(jobs);
  var hourArray = handleDimensionalArray(hours);
  for (var f = 0; f < forms; f++) {
    var index = jobTitleArray[f].length;
    if (f > 0) {
      loadAdditionalVehicleWork(f, jobTitleArray[f][0], hourArray[f][0]);
    }
    for(var i = 1; i < index; i++) {
      loadExtraVehicleWork(i - 1, jobTitleArray[f][i], hourArray[f][i], f);
    }
  }
}
function loadAdditionalVehicleWork(additional, jobTitle, hours) {
  $('#additional-vehicle-work-add-button').attr('onclick', `loadAdditionalVehicleWork(${additional + 1});`);
  var template = $('#additional-vehicle-work-template').html();
  var html = Mustache.render(template, {additional, jobTitle, hours});
  $('#additional-vehicle-form-div').append(html);
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
function loadMaterialEditForm(id, shipment, quantity, unit, vehicleId, supplier, startTime, endTime) {
  var template = $('#material-edit-form-template').html();
  var html = Mustache.render(template, {id, shipment, quantity, unit, vehicleId, supplier, startTime, endTime})
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
function removeMaterialEditForm(id, shipment, quantity, unit, vehicleId, supplier, startTime, endTime) {
  var template = $('#material-edit-form-button').html();
  var html = Mustache.render(template, {id, shipment, quantity, unit, vehicleId, supplier, startTime, endTime});
  $('#material-edit-'+ id +'-div').append(html);
  $(`#material-edit-form-${id}`).remove();
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

function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function handleDimensionalArray(string) {
  var array = [];
  string = decodeHtml(string).split('"');
  string.splice(string.indexOf('['), 1);
  string.splice(string.indexOf(']'), 1);
  if (string.indexOf(',') != -1) {
    string = string.toString().split(',,,');
    for (var i in string) {
      brokenString = string[i].toString().split(',');
      array[i] = [];
      for (var j in brokenString) {
        array[i][j] = brokenString[j];
      }
    }
  } else {
    array[0] = string.toString().split(',');
  }
  return array;
}