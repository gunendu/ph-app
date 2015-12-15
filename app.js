var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var Horntell = require('horntell');
var config = require('ph_config').core;
var app = express();

var ErrorHandler = require('./handlers/error-handlers');
var utils = require('./routes/utils');
var errorCodes = require('./routes/errors');

Horntell.app.init(config.horntell.hornokpleasekey, config.horntell.hornokpleasesecret);

var ph = require('./routes/ph');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('case sensitive routing', true);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(cookieParser());

app.use(function (req, res, next) {
  console.log("http method",req.method,req.url);
  res.header('Access-Control-Allow-Origin', "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-token");
  if(req.method == 'GET' || req.method == 'OPTIONS' || req.url.indexOf("login")>0) {
    console.log("access token is not required");
    next();
  } else {
    console.log("access token is required");
    var token = req.headers['access-token'];
    console.log("token is",token,req.headers);
    jwt.verify(token,'jwtsecret',function(err,user_id) {
      if(err) {
        console.log("error is",err);
        return res.status(400).send(utils.createErrResp(errorCodes.INVALID_SESSION,"")) 
      } else {
        console.log("success fully verified user",user_id);
        req.user_id = user_id;
        next();
      }   
    })  
  }  
});

app.use('/user', ph);

app.use(ErrorHandler.clientErrorHandler);

module.exports = app;
