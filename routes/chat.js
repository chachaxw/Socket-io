const express = require('express');
const router = express.Router();
const socket_io = require('socket.io');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express chat room' });
});

router.prepareSocketIO = server => {
  const io = socket_io.listen(server);
  io.sockets.on('connection', socket => {
    socket.on('join', user => {
      socket.user = user;
      socket.emit('state', 'SERVER', true);
      socket.broadcast.emit('state', 'SERVER', user + '上线了');
    });
    socket.on('sendMSG', msg => {
      socket.emit('chat', socket.user, msg);
      socket.broadcast.emit('chat', socket.user, msg);
    });
  });
}

module.exports = router;
