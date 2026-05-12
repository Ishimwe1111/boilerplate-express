const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Body parser middleware to handle form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files and the HTML form
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// POST route to handle form submission
app.post('/name', function(req, res) {
  const firstName = req.body.first;
  const lastName = req.body.last;
  
  res.json({name: firstName + ' ' + lastName});
});

module.exports = app;
