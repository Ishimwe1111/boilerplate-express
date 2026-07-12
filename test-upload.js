const fs = require('fs');
const path = require('path');
const http = require('http');

const filePath = path.join(__dirname, 'testfile.txt');
fs.writeFileSync(filePath, 'hello from node test');

const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/fileanalyse',
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=' + boundary
  }
};

const fileContent = fs.readFileSync(filePath);
let body = Buffer.concat([
  Buffer.from('--' + boundary + '\r\n' + 'Content-Disposition: form-data; name="upfile"; filename="testfile.txt"\r\n' + 'Content-Type: text/plain\r\n\r\n'),
  fileContent,
  Buffer.from('\r\n--' + boundary + '--\r\n')
]);
options.headers['Content-Length'] = body.length;

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Body:', data);
  });
});

req.on('error', (e) => { console.error('Error:', e); });
req.write(body);
req.end();
