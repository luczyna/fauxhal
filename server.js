var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 9000;
var app = express();
var server = require('http').createServer(app);

var fauxhal = require('./hal.js');

server.listen(port);

console.log('fauxhal server now active at localhost:%s\n', port);

app
  .use(express.static(process.cwd()))
  .use(bodyParser.urlencoded({ extended: true }));

/////
// put routes here
/////

/* 
 * version information
 */
app
  .get('/version', fauxhal.version);

/* 
 * notes information
 */
app
  .get('/notes', fauxhal.notes.get)
  .post('/note', fauxhal.notes.new)
  .get('/note/:nummer', fauxhal.notes.note)
  .put('/note/:nummer', fauxhal.notes.update)
  .delete('/note/:nummer', fauxhal.notes.delete);