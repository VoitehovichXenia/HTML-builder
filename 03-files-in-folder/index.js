const fs = require('fs');
const path = require('path');
const secretFolderPath = path.join(__dirname, 'secret-folder');

(async function showFiles() {
  const items = await fs.promises.readdir(secretFolderPath);

  for (let i = 0; i < items.length; i++) {
    const fileStats = await fs.promises.stat(
      path.join(secretFolderPath, items[i])
    );

    if (!fileStats.isDirectory()) {
      const dotIndex = items[i].indexOf('.');
      const name = items[i].slice(0, dotIndex);
      const extension = items[i].slice(dotIndex + 1);
      console.log(`${name} - ${extension} - ${(fileStats.size / 1024).toFixed(3)}kb`);
    }
  }
})();
