const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./components/App.js');
const request = require('./nRequest.js');

request.get('/api/interpretations', function(data) {
  data = JSON.parse(data);
  ReactDOM.render((<App interpretations={data}/>), document.getElementById('App'));
});