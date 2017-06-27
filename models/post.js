var conn = require('../connect');

class post{
  constructor(){
    this.idtrip = 0;
    this.postname = '';
    this.idadmin = 0;
    this.asal = '';
    this.tujuan = '';
    this.tanggal = '';
    this.budget = 0;
    this.kapasitas = 0;
    this.sisa = 0;
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
    this.budget = data.budget;
    this.kapasitas = data.kapasitas;
    this.detail = data.detail;
    this.foto = data.foto;
    this.sisa = data.sisa;
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
  getbudget(){
    return this.budget;
  }
  getkapasitas(){
    return this.kapasitas;
  }
  getsisa(){
    return this.sisa;
  }
  getdetail(){
    return this.detail;
  }
  getfoto(){
    return this.foto;
  }
  setfoto(name){
    this.foto = name;
  }
  setidtrip(id){
    this.idtrip = id;
  }
  getidtrip(){
    return this.idtrip;
  }
}
module.exports = post;
