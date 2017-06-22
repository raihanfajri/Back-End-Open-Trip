var connection = require('knex')({
  client: 'mysql',
  connection: {
    host     : 'DESKTOP-MT6S6G4',
    user     : 'root',
    password : 'klinikfarfa',
    database : 'opentrip'
  }
});
module.exports = connection;
