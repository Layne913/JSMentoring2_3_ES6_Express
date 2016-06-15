'use strict';
const http = require('http');

class Express {
  constructor() {
    this.pathCallback = [];
    this.endFlag = false;
    this.nextFlag = true;
  }

  createServer() {
    return http.createServer((req, res) => {
      let response = this.createResponse(res);
      let next = this.createNext();

      let index = 0;
      while (!this.endFlag && this.nextFlag  && index < this.pathCallback.length) {
        let element = this.pathCallback[index];
        if (this.checkRequestMatch(req, element)) {
            this.nextFlag = false;
            element.callback(req, response, next);
        }
        index ++;
      }
    });
  }

  createResponse(res) {
    let resEnd = res.end;
    return Object.assign(res, {
                  send: (message) => {
                    res.write(message);
                    res.end();
                    this.endFlag = true;
                  }
                 });
  }

  createNext() {
    return () => this.nextFlag = true;
  }

  listen(port, callback) {
    this.server = this.createServer();
    this.server.listen(port, callback);
  }

  get(path, callback) {
    this.pathCallback.push({
      path: path,
      method: 'GET',
      callback: callback
    })
  }

  checkRequestMatch(req, element) {
    return element.method === 'USE'
            ? this.checkRequestMatchUse(req, element)
            : this.checkGeneralRequestMath(req, element);
  }

  checkRequestMatchUse(req, element) {
    return req.url.startsWith(element.path);
  }

  checkGeneralRequestMath(req, element) {
    return req.url === element.path && req.method === element.method;
  }

  use(path, callback) {
    if (arguments.length === 1) {
      path = '/';
      callback = arguments[0];
    }

    this.pathCallback.push({
      path: path,
      method: 'USE',
      callback: callback
    });

  }
}

let app = new Express();
let PORT = 8080;

app.listen(PORT, () => {
  console.log("listen to Port " + PORT);
});

app.use(function(req, res, next) {
  res.write('dfdf ');
  next();
});

app.get('/login', function(req, res) {
  res.send('login');
});

app.get('/', function(req, res, next) {
  res.write("get");
  res.end();
});






