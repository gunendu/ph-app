/* Error map */
module.exports = {
  'ZIPPR_ERROR' : "zippr-error",

  'INVALID_DATATYPE': {
    code: 2112,
    msg: 'Invalid data type '
  },

  'INVALID_EMAIL_ERR': {
    code: 1005,
    msg: 'Invalid Email Id '
  },  

  'INTERNAL_SERVER_ERR': {
    code: 1003,
    msg: 'Internal Server Error. Something wrong with Server'
  }, 

  'INTERNAL_SERVER_ERR_108': {
    code: 2114,
    msg: 'Soap Server Error'
  },

  'INVALID_API_KEY': {
    code: 1002,
    msg: 'Invalid client api key'
  },

  'INVALID_REQUEST': {
    code: 2116,
    msg: 'Invalid Request. Check your request params and try again.'
  },
  'USER_TAKEN': {
    code: 1004,
    msg: 'Username already taken'
  },
  'USER_NOT_FOUND': {
    code: 1007,
    msg: 'User not found'
  },

  'ZIPPR_NOT_FOUND': {
    code: 1008,
    msg: 'Zippr Not Found'
  },

  'INTERNAL_SOURCE_ERROR': {
    code: 2122,
    msg: 'Internal source error.'
  },

  'INVALID_LOCATION': {
    code: 2128,
    msg: 'Invalid location'
  },

  'TRADEZONE_NOT_FOUND': {
    code: 3000,
    msg:  'tradezone not found'  
  },

  'INVALID_USER_PASSWORD': {
     code: 1009,
     msg: 'Login failed. Invalid username or password' 
  },
  'IMAGE_UPLOAD_LIMIT': {
     code: 1010,
     msg: 'Image upload limit exceeded' 
  },
  'INVALID_PASSWORD_LENGTH': {
     code: 1011,
     msg: 'Password not conforming to required length.'
  },
  'INVALID_ADDRESS_FIELDS': {
     code: 1020,
     msg: 'Invalid address format'
  },
  'INVALID_DATA': {
     code: 1006,
     msg: 'Not allowed to update this field' 
  },
  'INVALID_URL': {
    code: 1018,
    msg: 'Invalid URL.'
  },
  'INVALID_NAME_LENGTH': {
    code: 1013,
    msg: 'Name not conforming to required length'
  },
  'INVALID_FIELDS': {
    code: 1012,
    msg: 'Invalid fields/wrong fields sent as part of request'
  },
  'INVALID_SESSION': {
    code: 1001,
    msg: 'Invalid session'
  },
  'ACCESS_DENIED': {
    code: 1015,
    msg: 'Access denied. Session user is not allowed to perform this operation.'
  },
  'VALIDATION_ERROR': {
    code: 1016,
    msg: 'Validation Error Mongoose'
  },
  'OLD_PASSWORD': {
    code: 1021,
    msg: 'Old password is incorreect.'	
  }  

};
