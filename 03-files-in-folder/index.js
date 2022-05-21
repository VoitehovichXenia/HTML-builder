const fs = require('fs');
const path = require('path');
const secretFolder = path.join(__dirname, 'secret-folder');


fs.readdir(
  path.join(__dirname, 'secret-folder'),
  (err, items) => {
    if (err) throw err;
    for (let i = 0; i < items.length; i++) {
      fs.stat(
        path.join(secretFolder, items[i]), 
        (err, stats) => {
          if (err) throw err;
          if (!stats.isDirectory()) {
            const dotIndex = items[i].indexOf('.');
            const name = items[i].slice(0, dotIndex);
            const extension = items[i].slice(dotIndex + 1);
            console.log(`${name} - ${extension} - ${stats.size / 1000}kb`);
          }
        }
      );
    }
  }
);