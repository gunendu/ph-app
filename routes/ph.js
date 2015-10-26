var express = require('express');

var router = express.Router();

var UserController = require('ph-core').Controllers.UserController;
var PostController = require('ph-core').Controllers.PostController;
var CommentController = require('ph-core').Controllers.CommentController;

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
 
  PostController.create(title,url)
    .then(function(response) {
      return res.status(201).send({
        "status": "success",
        "result": response
      })  
    })
    .catch(function(e) {
       console.log("create post error"); 
    })  
   
});

router.get('/post',function(req,res,next) {
  console.log("get posts is called"); 
  PostController.getPosts()
    .then(function(response) {
      console.log("posts is",response);
      return res.status(200).send({
        "status": "success",
        "result": response
      })   
    })
    .catch(function(e) {
      console.log("get posts is called"); 
    })  
});

router.post('/vote', function(req,res,next) {
  console.log("vote post is called");
  var post_id = req.param("post_id");
  PostController.votePosts(post_id)
    .then(function(response) {
      return res.status(200).send({
        "status": "success",
        "result": response
      }) 
    })
    .catch(function(e) {
       console.log("vote posts error");  
    })  
});

router.post('/downvote', function(req,res,next) {
  console.log("down vote is called");
  var post_id = req.param("post_id");
  PostController.downvote(post_id)
    .then(function(response) {
      return res.status(200).send({
        "status": "success",
        "result": response
      })  
    })
    .catch(function(e) {
      console.log("down vote is called"); 
    })  
});

router.post('/comment', function(req,res,next) {
   console.log("create comment is called");
   var post_id = req.param("post_id");
   var comment = req.param("comment"); 
   CommentController.create(post_id,comment)
    .then(function(response) {
      return res.status(200).send({
        "status": "success",
        "result": response
      })  
    })
    .catch(function(e) {
      console.log("create comment error");
    })  
});

router.get('/comment/:postid', function(req,res,next) {
  console.log("get comments is called");
  var postid = req.params.postid;
  console.log("postid",postid);
  CommentController.getComments(postid)
    .then(function(response) {
       return res.status(200).send({
         "status": "success",
         "result": response 
       })  
    })
    .catch(function(e) {
      console.log("get comments error"); 
    })  
});  

module.exports = router;
