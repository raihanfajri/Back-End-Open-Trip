var express = require('express');
var router = express.Router();
users = require('../models/user');
var user = new users;
var conn = require('../connect')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/login',function(req,res){
  conn('users').where('email',req.body.email).asCallback(function(err,hasil){
    if(err == null){
      //jika user belum terdaftar : insert to users
      if(hasil==''){
        var inserted = {Username:req.body.name,email:req.body.email,foto_profil:req.body.picture};
        console.log(inserted);
        conn('users').insert(inserted).asCallback(function(err){
          if(err == null){
            console.log("Berhasil query");
          }else{
            console.log("Gagal query insert");
          }
        });
        //console.log("data baru berhasil ditambahkan");
      }
      else{
        console.log("user is already registered");
      }
    }else{
      console.log("Gagal query select");
    }
  });
  conn('users').where('email',req.body.email).asCallback(function(err,hasil){
    if(err == null){
      res.send(JSON.stringify(hasil));
      console.log("berhasil " + hasil);
    }
    else{
      console.log("error " + req.body.email);
    }
  });
});
router.post('/contactlist',function(req,res){
  user.getallcontact(req.body.email,function(err,hasil){
    if(err == null){
      res.send(JSON.stringify(hasil));
      console.log("berhasil mendapatkan kontak")
    }
    else{
      console.log(err);
    }
  });
});

module.exports = router;
