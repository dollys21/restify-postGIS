var restify = require('restify'),
    fs      = require('fs'),
    config  = require('./bin/config.js'),
    db      = require('./bin/db.js');
var app     = restify.createServer();

db.initDB('keepAlive');

app.use(restify.queryParser())
app.use(restify.CORS())
app.use(restify.fullResponse())

// Routes
app.get('/parks/within', db.selectBox);
app.get('/parks', db.selectAll);
app.get('/status', function (req, res, next)
{
  res.send("{status: 'ok'}");
});

app.get('/', function (req, res, next)
{
  res.send('Hello World!')
});

app.get(/\/(css|js|img)\/?.*/, restify.serveStatic({directory: __dirname+'/static'}));

app.listen(config.get('PORT'), config.get('IP'), function () {
  console.log( "Listening on " + config.get('IP') + ", port " + config.get('PORT') )
});
