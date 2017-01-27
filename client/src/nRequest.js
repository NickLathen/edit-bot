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
    const data = {
      interpretationId,
      triggerId,
      text
    };
    const request = new XMLHttpRequest();
    request.addEventListener('load', function() {
      callback(this.responseText);
    });
    request.open('POST', '/api/trigger');
    request.send(JSON.stringify(data));
  },
  editResponse: function editResponse(interpretationId, responseId, text, callback) {
    const data = {
      interpretationId,
      responseId,
      text
    };
    const request = new XMLHttpRequest();
    request.addEventListener('load', function() {
      callback(this.responseText);
    });
    request.open('POST', '/api/trigger');
    request.send(JSON.stringify(data));
  }
};