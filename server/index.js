const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const path = require('path');

app.use(express.static(path.join('.')));

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

const connect = require('./db');
const routes = require('./db/routes');

connect();

app.use('/api', routes);
app.use('/*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../client/index.html`));
});

http.listen(3000, () => {
  console.log('Server running on port 3000');
});
