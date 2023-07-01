const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const fs = require('fs');
const path = require('path')
const ws = require('ws');
const https = require('https');
const cors = require('cors');
global.env =  require('secure-env')({secret:'ccc123'});


app.use(cors());

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const errorController = require('./controllers/error');

app.use(bodyParser.json());

const ports = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Accept, X-Custom-Header, Authorization'
  );
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use('/auth', authRoutes);

app.use('/user', userRoutes);

app.use('/contactus', require('./routes/contactus'));

app.use('/squarehandler', require('./routes/squarehandler'));

app.use(errorController.get404);

app.use(errorController.get500);


if (global.env.NODE_ENV === 'dev') {
  console.log(`Launching ${global.env.NODE_PROJECT_NAME} API in dev mode...`);
  app.listen(ports, () => console.log(`Listening on port ${ports}`));
} else if (global.env.NODE_ENV === 'prod') {
  console.log(`Launching ${global.env.NODE_PROJECT_NAME} API in production mode securely...`);

  const wsServer = new ws.Server({ noServer: true });
  wsServer.on('connection', socket => {
    socket.on('message', message => console.log(message));
  });

  const sslServer = https.createServer(
    {
      key: fs.readFileSync(path.join(__dirname, 'ssl-information', 'private.key')),
      cert: fs.readFileSync(path.join(__dirname, 'ssl-information', 'safeservemetro.ssl-bundle.crt')),
    }, app)

  sslServer.listen(ports, () => console.log(`Listening on port ${ports} SECURELY`));
  sslServer.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
      wsServer.emit('connection', socket, request);
    });
  });
}
