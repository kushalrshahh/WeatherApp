'use strict';
/**
 * Module dependencies.
 */
var express = require("express"),
	morgan = require("morgan");

var app = express();

var port = 2800;

app.use(morgan('dev'));

//app.locals.appJs = 'public/app.js';
app.use(express.static(__dirname + '/public'));

//app.use(require("./modules"));

app.get('/', function(req, res){
  res.sendfile('./public/index.html');
});
//app.all('/*', function(req, res){
  //res.send('Page not found');
//});

app.listen(port);

// Expose app
exports = module.exports = app;

console.log("App started on port : "+port);


