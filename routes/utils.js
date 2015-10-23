var _ = require("underscore");

var getInvalidParams = function (params, req) {
  return _.partition(params, function(element) {
    var param = req.param(element);
    return param === undefined || param === null;
  })[0];
};

var getExceptionsParams = function (params, req) {
   return _.partition(params, function(element) {
     var param = req.param(element);
     return param!=undefined; 
   })[0];  
};  

var getFirstInvalidParam = function (params, req) {
  return _.first(getInvalidParams(params, req));
};

var getApiKey = function (req) {
  var apiKey = req.headers['x-zippr-api-key'];
  return apiKey ? apiKey : null;
};

var getApiKeyV2 = function (req) {
  var apiKey = req.headers['x-zippr-api-key'];
  return apiKey ? apiKey : null;
};

var validateParams = function (cb) {
  for (var key in this) {
    if (this.hasOwnProperty(key)) {
      /* Needs modification */
      if (!_.isString(this[key])) {
        cb(true, {"ok": false, "code": "2111", "message": "Mandatory field " + key + " is empty"});
      }
    }
  }
  cb(null, null);
};

var createSucResp = function (result) {
  var resp = {
    'status': true,
    'result': (result != null) ? (result) : ("")
  };
  console.log("createSucResp: " + JSON.stringify(resp));
  return resp;
};

var createErrResp = function (errorType, errMsgExt,debug) {
  var errCode = errorType.code;
  if (errCode === null)
    errCode = errorType.INTERNAL_SERVER_ERR;
  
  var error = {};
  error.code = errCode;
  error.reason= errorType.msg + " " + errMsgExt;
  error.debug = debug;  
  return {
    'ok': false,
    "error": error
  };
};

var latlngvalidity = function(lat, lng) {
    if (inrange(-90, lat, 90) && inrange(-180, lng, 180)) {
       return true;
    } else {
       return false;
    }
};

function inrange(min, number, max) {
    if (!isNaN(number) && (number >= min) && (number <= max)) {
       return true;
    } else {
       return false;
    }
};

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var isValidEmail = function (email) {
  return emailRE.test(email);
};

var isCountryCode = function (countrycode) {
  return ApiUtils.Base.isCountryCode(countrycode);
};

var alphaNumericRE = /^[a-z0-9]+$/i;
var isAlphaNumeric = function (val) {
  return alphaNumericRE.test(val);
};

var isValidPasswordLength = function (val) {
  return val.length >5 && val.length <=15 ? true: false;    
};

var isValidNameLength = function (val) {
  return val.length >= 1 && val.length <=30 ? true: false ;
};

var isValidTitleLength = function (val) {
  return val.length >= 1 && val.length <=50 ? true: false ; 	
};  


module.exports = {
  "validateParams": validateParams,
  "createSucResp": createSucResp,
  "createErrResp": createErrResp,
  "getInvalidParams" : getInvalidParams,
  "getFirstInvalidParam": getFirstInvalidParam,
  "getApiKey" :getApiKey,
  "getApiKeyV2": getApiKeyV2,
  "isNumber": isNumber,
  "isValidEmail" : isValidEmail,
  "isCountryCode" : isCountryCode,
  "isAlphaNumeric" : isAlphaNumeric,
  "latlngvalidity": latlngvalidity,
  "isValidPasswordLength": isValidPasswordLength,
  "getExceptionsParams": getExceptionsParams,
  "isValidNameLength": isValidNameLength,
  "isValidTitleLength": isValidTitleLength
};
