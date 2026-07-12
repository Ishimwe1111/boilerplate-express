const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

/*
====================================
MIDDLEWARE
====================================
*/

app.use(bodyParser.urlencoded({ extended: false }));

/*
====================================
HOME PAGE
====================================
*/

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

/*
====================================
POST ROUTE
====================================
*/

app.post('/name', (req, res) => {
  const first = req.body.first;
  const last = req.body.last;

  res.json({
    name: `${first} ${last}`
  });
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { originalname: name, mimetype: type, size } = req.file;
  res.json({ name, type, size });
});

/*
====================================
EXPORT
====================================
*/

module.exports = app;