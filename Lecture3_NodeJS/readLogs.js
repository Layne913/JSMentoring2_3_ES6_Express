const fs = require('fs');

fs.readFile('$(__dirname)/log','utf-8', (err, data) => {
  const result = data
    .split('\n')
    .reduce((stats, entry) => {
      if (stats[entry] === undefined) {
        stats[entry] = 0;
      } else {
        stats[entry] += 1;
      }

      return stats;
    }, {})

  coonst analyzed = Object.keys(result)
  .map(entry=> ({
    entry:entry,
    count:result[entry]
  }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 10)
  .map(item => item.entry)
})