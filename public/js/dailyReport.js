$('document').ready(function() {
  $('select').formSelect();
  $('#employee-form-close').on('click', function() {
    alert('Hi');
    var template = $('#employee-work-form-add-button').html();
    $('#add-employee-work').append(template);
    $('#employee-work-form-div').remove();
  });
});

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
  $('.timepicker').timepicker();
  $('select').formSelect();
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
  $('.timepicker').timepicker();
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
  $('.timepicker').timepicker();
  $('select').formSelect();
};
function removeVehicleForm() {
  var template = $('#vehicle-work-form-add-button').html();
  $('#vehicle-work-button-div').append(template);
  $('#vehicle-work-form').remove();
};
function loadVehicleEditForm(id, work, start, end, vehicleId) {
  if (start.split(' ').length > 1) {
    start = start.split(' ')[4];
  }
  if (end.split(' ').length > 1) {
    end = end.split(' ')[4];
  }
  var template = $('#vehicle-work-edit-form-template').html();
  var html = Mustache.render(template, {id, work, start, end, vehicleId})
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
  $('.timepicker').timepicker();
};
function removeVehicleEditForm(id, jobTitle, startTime, endTime, vehicleId) {
  var template = $('#vehicle-edit-form-button').html();
  var html = Mustache.render(template, {id, jobTitle, startTime, endTime, vehicleId});
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

function loadProductionForm() {
  var template = $('#production-form-template').html();
  $("#production-form-div").append(template);
  $('#add-production').remove();
  $('input.autocomplete-production').autocomplete({
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
  $('.timepicker').timepicker();
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
  $('.timepicker').timepicker();
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
};
function removeMaterialForm() {
  var template = $('#material-form-add-button').html();
  $('#material-button-div').append(template);
  $('#material-form').remove();
};
function loadMaterialEditForm(id, shipment, quantity, unit, vehicleId) {
  var template = $('#material-edit-form-template').html();
  var html = Mustache.render(template, {id, shipment, quantity, unit, vehicleId})
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
};
function removeMaterialEditForm(id, shipment, quantity, unit, vehicleId) {
  var template = $('#material-edit-form-button').html();
  var html = Mustache.render(template, {id, shipment, quantity, unit, vehicleId});
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
