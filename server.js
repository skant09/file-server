const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the 'public' folder
// app.use(express.static('public'))

app.get('/', (req, res) => {
  console.log('Received request for root path');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
// Endpoint to send the file
app.get('/download', (req, res) => {
  const filePath = path.join(__dirname, 'files', 'sample.txt');
  res.download(filePath, 'sample.txt', (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).send('File not found.');
    }
  });
});

// SSE endpoint
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Send a message every 2 seconds
  const intervalId = setInterval(() => {
    res.write(`data: ${JSON.stringify({ time: new Date().toISOString() })}\n\n`);
  }, 2000);

  // Clean up when client disconnects
  req.on('close', () => {
    clearInterval(intervalId);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
