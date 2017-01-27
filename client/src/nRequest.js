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
    request.open('POST', '/api/triggers');
    request.send(JSON.stringify(data));
  },
  deleteTrigger: function deleteTrigger(interpretationId, triggerId, callback) {
    const data = {
      interpretationId,
      triggerId
    };
    const request = new XMLHttpRequest();
    request.addEventListener('load', function() {
      callback(this.responseText);
    });
    request.open('DELETE', '/api/triggers');
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
    request.open('POST', '/api/responses');
    request.send(JSON.stringify(data));
  },
  deleteResponse: function deleteResponse(interpretationId, responseId, callback) {
    const data = {
      interpretationId,
      responseId
    };
    const request = new XMLHttpRequest();
    request.addEventListener('load', function() {
      callback(this.responseText);
    });
    request.open('DELETE', '/api/responses');
    request.send(JSON.stringify(data));
  }
};