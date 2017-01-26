const express = require('express');
const app = express();
const port = 9999;
const appDirectory = __dirname.slice(0, __dirname.length - 7); //base app directory

const mockData = require(appDirectory + '/test/mockInterpretations.js');

app.use(express.static(appDirectory + '/client/build'));

app.get('/', (req, res) => {
  res.sendFile(appDirectory + '/client/src/index.html');
});

app.listen(port, () => {
  console.log('listening on port ' + port);
});