const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
app.use(cors());

app.get('/comic/:id', (req, res) => {
  request({ 
    url: `https://xkcd.com/${req.params.id}/info.0.json`,
    json: true 
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.json(body);
    }
  });
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
