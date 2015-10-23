var express = require('express');

var router = express.Router();

var UserController = require('ph-core').Controllers.UserController;

router.post('/save',function(req,res,next) {
   console.log("create user is called");
   var username = req.param("username");
   var password = req.param("password");
   var firstname = req.param("firstname");

   UserController.saveUser(username,username,password,firstname)
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
