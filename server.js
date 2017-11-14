var express = require('express');
var app = express();
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var resourceServer = 'http://localhost:3000',
  appServer = 'http://localhost:4200';

app.all("/todo/*", function(req, res) {
  console.log(req);
  console.log('redirecting to ' + resourceServer);
  apiProxy.web(req, res, {target: resourceServer});
});

app.all("/*", function(req, res) {
  console.log('redirecting to ' + appServer);
  apiProxy.web(req, res, {target: appServer});
});

app.listen(80, function(err, res) {
  if (err) console.log(err);
  console.log('listening on 80');
});


