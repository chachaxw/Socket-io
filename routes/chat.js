const express = require('express');
const router = express.Router();
const url = require('url');
const WebSocketServer = require('ws').Server;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express chat room' });
});

router.webSocket = server => {
  const wss = new WebSocketServer({ server: server });

  wss.on('connection', function connection(ws) {
    const location = url.parse(ws.upgradeReq.url, true);

    ws.on('message', (data, flags) => {
      console.log('收到消息: ' + data, flags);
      ws.send('消息已收到');
    });

    ws.on('open', () => {
      console.log('connected');
      ws.send('Socket connected', {mask: true});
    });

    // ws.on('close', function close() {
    //   console.log('disconnected');
    // });
    ws.send('Socket 已创建成功');
  });

};

module.exports = router;
