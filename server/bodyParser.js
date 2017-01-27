module.exports = function bodyParser(request, response, next) {
  if (request.method !== 'POST') { return next(); }
  var requestBody = [];
  request.on('data', function(chunk) {
    requestBody.push(chunk);
  });
  request.on('end', function() {
    requestBody = Buffer.concat(requestBody).toString();
    requestBody = JSON.parse(requestBody);
    request.body = requestBody;
    next();
  });
};