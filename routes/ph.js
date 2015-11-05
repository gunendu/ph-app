var express = require('express');
var multer = require('multer');
var jwt = require('jsonwebtoken');

var router = express.Router();

var UserController = require('ph-core').Controllers.UserController;
var PostController = require('ph-core').Controllers.PostController;
var CommentController = require('ph-core').Controllers.CommentController;
var upload = multer({dest: '/tmp/'});

router.post('/login',function(req,res,next) {
   console.log("create user is called");
   var username = req.param("username");
   var name = req.param("name");
   var profile_url = req.param("profile_url");

   UserController.saveUser(username,username,name,profile_url)
     .then(function(response) {
        var token = jwt.sign(response.insertId, 'jwtsecret');
        response.token = token;
        return res.status(201).send({
          "status": "success",
          "result": response
        })
     })
     .catch(function(e) {
        console.log("user save"); 
     })   
});

router.post('/post',upload.array('image'),function(req,res,next) {
  var files = req.files;
  var jsondata = req.param("formdata");
  jsondata = JSON.parse(jsondata);
  console.log("formdata",jsondata,jsondata.title,files);
  PostController.create(jsondata.user_id,jsondata.product_name,jsondata.title,jsondata.url,files)
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
  var user_id = req.param("user_id");
  PostController.votePosts(user_id,post_id)
    .then(function(response) {
      return res.status(200).send({
        "status": "success",
        "result": response
      }) 
    })
    .catch(function(e) {
       console.log("vote posts error",e.stack);  
    })  
});

router.post('/downvote', function(req,res,next) {
  console.log("down vote is called");
  var post_id = req.param("post_id");
  var user_id = req.param("user_id");
  PostController.downvote(user_id,post_id)
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
   var user_id = req.param("user_id"); 
   CommentController.create(post_id,comment,user_id)
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
       console.log("response is",response);
       return res.status(200).send({
         "status": "success",
         "result": response 
       })  
    })
    .catch(function(e) {
      console.log("get comments error"); 
    })  
});

router.post('/image', upload.single('image'), function(req,res,next) {
   var file = req.file;
   UserController.uploadImage(file)
     .then(function(response) {
        return res.status(200).send({
          "ok": true,
          "response": response
        });  
     }) 
});

router.post('/logout', function(req,res) {
  req.session.destroy(function(err) {
    if(err) {
      console.log("error destroying session"); 
    } else {
      return res.status(200).send({
        "status": "success",
        "result": {} 
      })  
    }  
  })  
});

router.post('/reply', function(req,res,next) {
  var comment_id = req.param("comment_id");
  var message = req.param("reply");
  var user_id = req.param("user_id");  
  CommentController.saveReply(comment_id,message,user_id)
    .then(function(response) {
      return res.status(200).send({
        "ok": true,
        "response": response 
      });  
    })  
});

router.post('/voteComment', function(req,res,next) {
  var comment_id = req.param("comment_id");
  CommentController.voteComment(comment_id)
    .then(function(response) {
      return res.status(200).send({
        "ok": true,
        "response": response
      });  
    })  
});  
    
module.exports = router;
