const fs = require('fs');
const path = require('path');

function copyDir() {
  fs.exists(
    path.join(__dirname, 'files-copy'),
    exists => {
      if (!exists) {
        fs.mkdir(
          path.join(__dirname, 'files-copy'),
          err => {
            if (err) throw err;
          }
        );
      }
    }  
  );

  fs.readdir(
    path.join(__dirname, 'files'),
    (err, files) => {
      if (err) throw err;
      for (let i = 0; i < files.length; i++) {
        fs.copyFile(
          path.join(__dirname, 'files', files[i]),
          path.join(__dirname, 'files-copy', files[i]),
          err => {
            if (err) throw err;
          }
        ); 
      }
    }
  );  
}

copyDir();