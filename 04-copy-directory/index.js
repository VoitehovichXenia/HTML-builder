const fs = require('fs');
const path = require('path');

(async function copyDir() {
  try {
    await fs.promises.access(path.join(__dirname, 'files-copy'), fs.constants.F_OK);
    await fs.promises.rm(
      path.join(__dirname, 'files-copy'),
      {recursive: true}
    );
  } catch (err) {
    if (err) console.log('');
  }

  await fs.promises.mkdir(
    path.join(__dirname, 'files-copy')
  );

  const files = await fs.promises.readdir(
    path.join(__dirname, 'files')
  );  

  for (let i = 0; i < files.length; i++) {
    fs.copyFile(
      path.join(__dirname, 'files', files[i]),
      path.join(__dirname, 'files-copy', files[i]),
      err => {
        if (err) throw err;
      }
    ); 
  }

  return console.log('Directory was copied');
})();
