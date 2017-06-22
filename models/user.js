var conn = require('../connect');

class users{
  constructor(){
    this.idUser = '';
    this.username = '';
    this.email = '';
    this.foto_pro = '';
  }
  setidUser(id){
    this.idUser = id;
  }
  setusername(name){
    this.username = name;
  }
  setemail(mail){
    this.email = mail;
  }
  setfotoprofil(foto){
    this.foto_pro = foto;
  }
  getidUser(){
    return this.idUser;
  }
  getusername(){
    return this.username;
  }
  getemail(){
    return this.email;
  }
  getfoto(){
    return this.foto_pro;
  }
  // //ambil semua data user
  // getalldata(mail,callback){
  //   conn('users').where('email',mail).asCallback(callback);
  // }
  // //check if users already registered
  // registercek(data,callback){
  //   conn('users').where('email',data.email).asCallback(callback);
  // }
}

module.exports = users;
