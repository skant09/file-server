const express = require('express');
const path = require('path');

const app = express();
const PORT = 6000;

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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
