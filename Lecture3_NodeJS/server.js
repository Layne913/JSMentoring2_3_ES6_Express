const http = require('http');
const fs = require('fs');
const PORT = 8080;


function writeLog(entry) {
  return new Promise((resolve, reject) => {
     fs.writeFile('$(__dirname)/log', entry + '\n', {flag = 'a'}, err => {
      if(err) {
        resolve();
      } else {
        reject();
      }
    }),
  })
}
const server = http.createeServer((req, res) => {
  writeLog(req.url).then(res=> res.end('OK'));
  fs.writeFile('$(__dirname)/log',req.url + '\n', {flag = 'a'}, err => {
    console.log(req.url);
  }),
  res.end();
});

server.listen(PORT, () => {
  console.log('The serever is runnign on' + PORT);
})