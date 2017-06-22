var express = require('express');
var router = express.Router();
var conn = require('../connect');
var trips = require('../models/post');
var trip = new trips;

router.post('/createtrip',function(req,res){
  trip.setallatribut(req.body);
  var postthis = {tripname:trip.getpostname(),tripadminid:trip.getidadmin(),asal:trip.getasal(),tujuan:trip.gettujuan(),tanggalberangkat:trip.gettanggal(),detail:trip.getdetail()}
  conn('trip').insert(postthis).asCallback(function(err,hasil) {
    if(err == null){
      res.send("Berhasil");
    }else{
      res.send("Gagal");
    }
  })
});

router.get('/semuatrip',function(req,res,next){
    conn('trip').orderBy('idtrip','desc').asCallback(function(err,hasil){
      if(err == null){
        res.send(JSON.stringify(hasil));
      }
    })
});
router.get('/searchtrip',function(req,res,next){
    var key = '%'+req.headers.name+'%';
    conn('trip').where('tripname','like',key).asCallback(function(err,hasil){
      if(err == null){
        res.send(JSON.stringify(hasil));
      }
    })
});
//connection.end()

// router.get('/', function(req, res, next) {
//   res.send('done  ');
// });

module.exports = router;
