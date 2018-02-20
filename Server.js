var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname;
// var path = __dirname + '/views/';

router.use(function (req, res, next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "/views/index.html");
});

router.get("/about",function(req,res){
  res.sendFile(path + "/views/about.html");
});

router.get("/navbar.html",function(req,res){
  res.sendFile(path + "/views/navbar.html");
});

router.get("/navbar.js",function(req,res){
  res.sendFile(path + "/scripts/navbar.js");
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "/views/404.html");
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});
