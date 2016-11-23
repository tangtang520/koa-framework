/**
 * Created by tangtang on 2016/11/23.
 */
const config = require('../config/config');
module.exports = function (server) {
  const io = require('socket.io')(server);
  io.on('connection', function(_socket){

  });
}