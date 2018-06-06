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
  $('input.autocomplete').autocomplete({
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
function removeEmployeeForm() {
  var template = $('#employee-work-form-add-button').html();
  $('#employee-work-button-div').append(template);
  $('#employee-work-form').remove();
};
function deleteEmployeeWorkRequest(id) {
  $.ajax({
    type: 'DELETE',
    url: `/employeework/${id}`
  });
  location.reload(true);
};

function loadVehicleForm() {
  var template = $('#vehicle-work-form-template').html();
  $("#vehicle-work-form-div").append(template);
  $('#add-vehicle-work').remove();
};
function removeVehicleForm() {
  var template = $('#vehicle-work-form-add-button').html();
  $('#vehicle-work-button-div').append(template);
  $('#vehicle-work-form').remove();
};
function deleteVehicleWorkRequest(id) {
  $.ajax({
    type: 'DELETE',
    url: `/vehiclework/${id}`
  });
  location.reload(true);
};

function loadProductionForm() {
  var template = $('#production-form-template').html();
  $("#production-form-div").append(template);
  $('#add-production').remove();
};
function removeProductionForm() {
  var template = $('#production-form-add-button').html();
  $('#production-button-div').append(template);
  $('#production-form').remove();
};
function deleteProductionRequest(id) {
  $.ajax({
    type: 'DELETE',
    url: `/production/${id}`
  });
  location.reload(true);
};

function loadMaterialForm() {
  var template = $('#material-form-template').html();
  $("#material-form-div").append(template);
  $('#add-material').remove();
};
function removeMaterialForm() {
  var template = $('#material-form-add-button').html();
  $('#material-button-div').append(template);
  $('#material-form').remove();
};
function deleteMaterialRequest(id) {
  $.ajax({
    type: 'DELETE',
    url: `/material/${id}`
  });
  location.reload(true);
};