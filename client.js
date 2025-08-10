// client.js
const express = require('express');
const http = require('http');

const app = express();
const PORT = 3001;

app.get('/get-file', (req, res) => {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/download',
    method: 'GET',
  };

  const fileReq = http.request(options, (fileRes) => {
    // Pass the headers so browser knows it's a file
    res.setHeader('Content-Disposition', fileRes.headers['content-disposition'] || '');
    // res.setHeader('Content-Type', fileRes.headers['content-type'] || 'application/octet-stream');

    // Pipe the file directly to the response
    fileRes.pipe(res);
  });

  fileReq.on('error', (err) => {
    console.error('Error fetching file:', err.message);
    res.status(500).send('Could not fetch file.');
  });

  fileReq.end();
});

app.listen(PORT, () => {
  console.log(`Client server running at http://localhost:${PORT}`);
});
