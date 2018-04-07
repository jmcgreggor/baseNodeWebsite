var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname;
// var path = __dirname + '/views/';

router.use(function (req, res, next) {
  console.log("/" + req.method);
  next();
});

/* HTML ROUTES */

router.get("/",function(req,res){
  res.sendFile(path + "/views/index.html");
});

router.get("/about",function(req,res){
  res.sendFile(path + "/views/about.html");
});

router.get("/navbar.html",function(req,res){
  res.sendFile(path + "/views/navbar.html");
});

router.get("/header-index.html",function(req,res){
  res.sendFile(path + "/views/partials/header-index.html");
});

router.get("/header-about.html",function(req,res){
  res.sendFile(path + "/views/partials/header-about.html");
});

router.get("/header-main.jpg",function(req,res){
  res.sendFile(path + "/images/header-main.jpg");
});

router.get("/about-main.html",function(req,res){
  res.sendFile(path + "/views/partials/about-main.html");
});

router.get("/index-main.html",function(req,res){
  res.sendFile(path + "/views/partials/index-main.html");
});

router.get("/footer.html",function(req,res){
  res.sendFile(path + "/views/footer.html");
});

/* JS ROUTES */

router.get("/navbar.js",function(req,res){
  res.sendFile(path + "/scripts/navbar.js");
});

router.get("/body-header.js",function(req,res){
  res.sendFile(path + "/scripts/body-header.js");
});

router.get("/body-main.js",function(req,res){
  res.sendFile(path + "/scripts/body-main.js");
});

router.get("/body-footer.js",function(req,res){
  res.sendFile(path + "/scripts/body-footer.js");
});

router.get("/less.js",function(req,res){
  res.sendFile(path + "/node_modules/less/dist/less.js");
});

router.get("/styles.less",function(req,res){
  res.sendFile(path + "/stylesheets/styles.less");
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "/views/404.html");
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});
