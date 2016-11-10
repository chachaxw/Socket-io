const express = require('express');
const router = express.Router();
const WebSocketServer = require('ws').Server;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express chat room' });
});

router.webSocket = server => {
  const wss = new WebSocketServer({ server: server });

  wss.on('connection', function connection(ws) {

    ws.on('message', function incoming(message) {
      console.log('收到信息: %s', message);
    });

    ws.send('Halo Chacha, my name is World');
  });
}

module.exports = router;
