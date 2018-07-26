function deleteReportRequest(id) {
  $.ajax({
    type: 'DELETE',
    url: `/report/${id}`,
    success: function() {
      location.reload(true);
    }
  });
};