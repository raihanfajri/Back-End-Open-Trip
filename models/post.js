var conn = require('../connect');

class post{
  constructor(){
    this.postname = '';
    this.idadmin = 0;
    this.asal = '';
    this.tujuan = '';
    this.tanggal = '';
    this.detail = '';
    this.foto = '';
    this.meetingpoint = '';
  }
  setallatribut(data){
    this.postname = data.tripname;
    this.idadmin = data.idadmin;
    this.asal = data.asal;
    this.tujuan = data.tujuan;
    this.tanggal = data.tanggal;
    this.detail = data.detail;
  }
  getpostname(){
    return this.postname;
  }
  getidadmin(){
    return this.idadmin;
  }
  getasal(){
    return this.asal;
  }
  gettujuan(){
    return this.tujuan;
  }
  gettanggal(){
    return this.tanggal;
  }
  getdetail(){
    return this.detail;
  }
  // semuapost(callback){
  //   conn('trip').orderBy('idtrip','desc').asCallback(callback);
  // }
  // searchpost(name,callback){
  //   conn('trip').where('tripname','like',name).asCallback(callback);
  // }
  // kategoripost(name,callback){
  //   conn('trip').where('id_kategori',name).asCallback(callback);
  // }
  // createpost(callback){
  //   conn('trip').insert({tripname:this.postname,tripadminid:this.idadmin,asal:this.asal,tujuan:this.tujuan,tanggalberangkat:this.tanggal,detail:this.detail}).asCallback(callback);
  // }

}
module.exports = post;
