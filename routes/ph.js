var express = require('express');

var router = express.Router();

var UserController = require('ph-core').Controllers.UserController;
var PostController = require('ph-core').Controllers.PostController;

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

router.post('/post',function(req,res,next) {
  console.log("save post");
  var title = req.param("title");
  var url = req.param("url");

  console.log("title is",title);
   
  PostController.create(title,url)
    .then(function(response) {
      return res.status(201).send({
        "status": "success",
        "result": response
      })  
    })
    .catch(function(e) {
       console.log("creat post error"); 
    })  
   
});            

module.exports = router;
