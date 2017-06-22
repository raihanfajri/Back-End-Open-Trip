var express = require('express');
var router = express.Router();
var iochat = require('../socket/index');
var chat = new iochat;

router.io = require('socket.io')();

router.post('/', function(req, res) {
  res.send();
  console.log();
});
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  chat.setidroom();
  res.send("beep "+ chat.idroom);
  console.log(chat.idroom);
  chat.socket(router.io,chat.idroom);
});
module.exports = router;
