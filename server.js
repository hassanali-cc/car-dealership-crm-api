const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./models/index');
const userRoutes = require('./routes/users');
const dealRoutes = require('./routes/deals');
const { WebSocketServer } = require('ws');
const dealHandler = require('./websocket/dealHandler');

const serverPort = process.env.APP_PORT || 8000

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);
app.use('/auctions', dealRoutes);

// WebSocket
const server = app.listen(serverPort, () => console.log(`Server started on port ${serverPort}`));
const wss = new WebSocketServer({ server });
dealHandler(wss);

// Database Sync
sequelize.sync({ alter: true }).then(() => console.log('Database synced.'));
