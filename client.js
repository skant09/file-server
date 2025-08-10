// client.js
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 6001;

app.get('/get-file', async (req, res) => {
  try {
    const response = await axios({
      url: 'http://localhost:6000/download',
      method: 'GET',
      responseType: 'stream', // important for files
    });

    // Pass the headers so browser knows it's a file
    res.setHeader('Content-Disposition', response.headers['content-disposition']);
    res.setHeader('Content-Type', response.headers['content-type']);

    // Pipe the file directly to the response
    response.data.pipe(res);
  } catch (err) {
    console.error('Error fetching file:', err.message);
    res.status(500).send('Could not fetch file.');
  }
});

app.listen(PORT, () => {
  console.log(`Client server running at http://localhost:${PORT}`);
});
