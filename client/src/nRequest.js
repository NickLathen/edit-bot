module.exports = {
  get: function get(url, callback) {
    const request = new XMLHttpRequest();
    request.addEventListener('load', function() {
      callback(this.responseText);
    });
    request.open('GET', url);
    request.send();
  },
  editTrigger: function editTrigger(interpretationId, triggerId, text, callback) {
    const request = new XMLHttpRequest();
    request.addEventListener('load', function() {
      callback(this.responseText);
    });
    request.open('POST', '/api/trigger');
    request.send();
  },
  editResponse: function editResponse(interpretationId, responseId, text, callback) {
    callback();
  }
};