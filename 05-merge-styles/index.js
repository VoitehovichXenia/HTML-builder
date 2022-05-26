const fs = require('fs');
const path = require('path');

(async function bundleCSS() {
  const files = await fs.promises.readdir(
    path.join(__dirname, 'styles')
  );

  fs.open(
    path.join(__dirname, 'project-dist', 'bundle.css'),
    'w',
    err => {
      if (err) throw err;
    }
  );

  for (let i = 0; i < files.length; i++) {
    const extension = path.extname(files[i]);
    if (extension === '.css') {
      fs.readFile(
        path.join(__dirname, 'styles', files[i]),
        'utf-8',
        (err, data) => {
          if (err) throw err;
          fs.appendFile(
            path.join(__dirname, 'project-dist', 'bundle.css'),
            data,
            err => {
              if (err) throw err;
            }
          );  
        }
      );
    }      
  }

  return console.log('Styles was bundled');
})();
