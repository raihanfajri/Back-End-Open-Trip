var express = require('express');
var router = express.Router();
var conn = require('../connect');
var trips = require('../models/post');
var fs = require('fs');
var moment = require('moment');
var trip = new trips;

router.post('/createtrip',function(req,res){
  trip.setallatribut(req.body);
  //remove tag
  var base64Data = req.body.foto.replace(/^data:image\/jpeg;base64,/, "");
  var img = new Buffer(base64Data, 'base64');
  //nama foto berdasarkan tanggal, jam dan menit sekarang
  var imgname = trip.getidadmin()+''+moment().year()+''+moment().month()+''+moment().date()+''+moment().hour()+''+moment().minute()+'.jpeg';
  var lokasifoto = 'public/images/'+imgname;
  trip.setfoto(lokasifoto);
  var postthis = {tripname:trip.getpostname(),tripadminid:trip.getidadmin(),asal:trip.getasal(),tujuan:trip.gettujuan(),tanggalberangkat:trip.gettanggal(),budget:trip.getbudget(),kapasitas:trip.getbudget(),sisa:trip.getsisa(),detail:trip.getdetail(),foto:trip.getfoto()}
  conn('trip').insert(postthis).asCallback(function(error,kembali) {
    if(error == null){
      conn('trip').max('idtrip as id_group').where('tripadminid','=',trip.getidadmin()).asCallback(function(err,hasil){
        if(err == null){
          trip.setidtrip(hasil[0].id_group);
          console.log(hasil[0].id_group);
          var buatgroup = {id_group:trip.getidtrip(),id_user:trip.getidadmin()};
          conn('group').insert(buatgroup).asCallback(function(er,has){
            if(er == null){
              console.log("Berhasil memasukan data");
            }
            else console.log(er);
          });
        }
        else console.log("gagal ambil id");
      });
      res.send("Berhasil");
    }else{
      res.send("Gagal");
    }
  });
  if (!req.body.foto){
    console.log('No files were uploaded.');
  }
  else{
    //naro foto di public/images
    fs.writeFileSync(lokasifoto, img);
  }
});
router.post('/comment',function(req,res){
  var postthis = {idtrip: req.body.idtrip,idUser: req.body.idUser,commentcontent: req.body.commentcontent};
  var tanggal = moment();
  console.log(tanggal);
  conn('comments').insert(postthis).asCallback(function(err,hasil) {
    if(err == null){
      res.send({time:moment(tanggal).fromNow()});
    }else{
      res.send("Gagal");
    }
  })
});
router.get('/semuatrip',function(req,res,next){
    conn('trip').orderBy('idtrip','desc').asCallback(function(err,hasil){
      if(err == null){
        //replace string public buat akses image
        for(var i=0; i < hasil.length;i++){
          hasil[i].foto = hasil[i].foto.replace('public/','');
        }
        res.send(JSON.stringify(hasil));
      }
    })
});
router.get('/searchtrip',function(req,res,next){
    var key = '%'+req.query.name+'%';
    conn('trip').where('tripname','like',key).asCallback(function(err,hasil){
      if(err == null){
        //replace string public buat akses image
        for(var i=0; i < hasil.length;i++){
          hasil[i].foto = hasil[i].foto.replace('public/','');
        }
        res.send(JSON.stringify(hasil));
      }
    })
});
router.get('/getcomment',function(req,res,next){
    var key = req.query.id;
    conn('comments').join('users','users.idUser','=','comments.idUser').select('users.Username','comments.commentcontent','comments.tanggal').where('comments.idtrip',key).orderBy('comments.idcomment',req.query.order).limit(req.query.limit).asCallback(function(err,hasil){
      if(err == null){
        for(var i=0; i< hasil.length; i++){
          hasil[i].tanggal = moment(hasil[i].tanggal).fromNow();
          console.log(hasil[i].tanggal);
        }
        res.send(JSON.stringify(hasil));
      }
    })
});
//connection.end()

// router.get('/', function(req, res, next) {
//   res.send('done  ');
// });

module.exports = router;
