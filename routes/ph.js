var express = require('express');

var router = express.Router();

var PhApi = require('ph-core').Controllers.UserController;

router.post('/user/save',function(req,res,next) {
   var username = req.param("username");
   var password = req.param("password");
   var firstname = req.password("firstname");

   PhApi.saveUser(username,username,password,firstname)
     .then(function(response) {
        return res.status(201).send({
          "status": "success",
          "result": response
        })
     })
     .catch(function(e) {
        console.log("user save"); 
     })   
});

module.exports = router;
