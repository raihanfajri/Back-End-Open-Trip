var conn = require('../connect');
var shortid = require('shortid');

class chat{
  constructor(){
    this.idroom = '';
    this.iduser = '';
    this.idtrip = '';
  }
  setidroom(){
    this.idroom = shortid.generate();
  }
  sendmsg(msg){

  }
  socket(io,room) {
    // start listen with socket.io
    io.on('connection', function(socket){
      socket.join(room,function(){
        console.log('a user connected to room' + room)
      });
      //console.log('a user connected to room '+room);
      socket.on('new message', function(msg){
        var data = {
          message: msg.message,
          username:msg.username,
          date: Date.now()
        };
        var datainput = {
          id_chat: room,
          chat: msg.message,
          id_user: msg.idUser
          //id_trip: ''
        };
        console.log(datainput);
        conn('chat').insert(datainput).asCallback(function(err){
          if(err == null){ console.log("berhasil memasukan chat");}
          else {console.log("gagal memasukan chat");}
        });
        io.in(room).emit('chat message', data);
        console.log('msg to room '+ room);
      });
      socket.on('leave chat',function(){
          socket.leave(room);
          console.log('a user left room' + room);
      });
    });
  }
}

module.exports = chat;
