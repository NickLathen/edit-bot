module.exports = {
  get: function get(url, callback) {
    const req = new XMLHttpRequest();
    req.addEventListener('load', function() {
      callback(this.responseText);
    });
    req.open('GET', url);
    req.send();
  },
  editTrigger: function editTrigger(interpretationId, triggerId, text, callback) {
    callback();
  },
  editResponse: function editResponse() {

  }
};