const WebSocket = require('ws');

const dealHandler = (wss) => {
  wss.on('connection', (ws, req) => {
    console.log('WebSocket connected!');
    
    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message);

        const { dealId, userId } = data;

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'Deal_Progressed', dealId, userId }));
          }
        });
      } catch (error) {
        ws.send(JSON.stringify({ type: 'ERROR', message: error.message }));
      }
    });

    ws.on('close', () => console.log('WebSocket disconnected.'));
  });
};

module.exports = dealHandler;
