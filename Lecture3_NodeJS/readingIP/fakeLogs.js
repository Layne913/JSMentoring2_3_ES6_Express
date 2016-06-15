'use strict';
const fs = require('fs');

const dat = [];
for(let i = 0; i < 1000; i ++) {
  data.push('1.2.3.' + Math.floor(Math.random()*255));
}
fs.writeFile('{$(__dirname)}/log',data.join(''\n));