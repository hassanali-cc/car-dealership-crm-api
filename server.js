const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoutes = require('./routes/users');
const dealRoutes = require('./routes/deals');
const { WebSocketServer } = require('ws');
const dealHandler = require('./websocket/dealHandler');
const serverPort = process.env.APP_PORT || 8000

const app = express();

app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use('/v1/users', userRoutes);
app.use('/v1/deals', dealRoutes);

// Test Purpose
app.get('/check-refresh-token', (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "Refresh token not found" });

    res.json({ message: "Refresh token exists", refreshToken });
});


// WebSocket
const server = app.listen(serverPort, () => console.log(`Server started on port ${serverPort}`));
const wss = new WebSocketServer({ server });
dealHandler(wss);

// Database Sync
const { exec } = require('child_process');

async function applyMigrations() {
    return new Promise((resolve, reject) => {
        exec('npx prisma migrate deploy', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error applying migrations: ${stderr}`);
                reject(error);
            } else {
                console.log(`Migrations applied: ${stdout}`);
                resolve(stdout);
            }
        });
    });
}

applyMigrations()
    .then(() => console.log("Database migrations deployed."))
    .catch(console.error);

