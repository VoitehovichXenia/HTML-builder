const fs = require('fs');
const path = require('path');

async function bundleHTML() {
  fs.open(
    path.join(__dirname, 'project-dist', 'index.html'),
    'w',
    err => {
      if (err) throw err;
    }
  );
  
  let file = (
    await fs.promises.readFile(
      path.join(__dirname, 'template.html'), 
      'utf-8'
    )
  ).toString();

  const templateTags = file.match(/\{\{[a-z]+\}\}/gm);

  for (let i = 0; i < templateTags.length; i++) {
    const tagName = templateTags[i].slice(2, templateTags[i].length - 2);
    const templateHTML = await fs.promises.readFile(
      path.join(__dirname, 'components', `${tagName}.html`), 
      'utf-8'
    );
    const temp = new RegExp (templateTags[i], 'gm');

    file = file.replace(temp, templateHTML);
  }
  
  await fs.promises.writeFile(
    path.join(__dirname, 'project-dist', 'index.html'), 
    file
  );

  return true;
}

async function bundleStyles() {
  const files = await fs.promises.readdir(path.join(__dirname, 'styles'));

  fs.open(
    path.join(__dirname, 'project-dist', 'style.css'),
    'w',
    err => {
      if (err) throw err;
    }
  );

  for (let i = 0; i < files.length; i++) {
    const extension = path.extname(files[i]);

    if (extension === '.css') {
      const data = await fs.promises.readFile(path.join(__dirname, 'styles', files[i]));
      fs.appendFile(
        path.join(__dirname, 'project-dist', 'style.css'),
        data,
        err => {
          if (err) throw err;
        }
      );
    }
    
  }  

  return true;
}  
  
async function copyDir(srcDir, targetDir) {
  const files = await fs.promises.readdir(srcDir);
  fs.exists(targetDir, exists => {
    if (!exists) {
      fs.mkdir(targetDir, err => {
        if (err) throw err;
      });
    }
  });
  
  let src, dst;

  for (let i = 0; i < files.length; i++) {
    src = srcDir + '\\' + files[i];
    dst = targetDir + '\\' + files[i];

    const stat = await fs.promises.stat(src);

    if (stat.isDirectory()) {
      copyDir(src, dst);
    }
  
    if (stat.isFile()) {
      fs.promises.copyFile(src, dst);     
    }      
  }

  return true;
}

(async () => {
  try {
    await fs.promises.access(path.join(__dirname, 'project-dist'), fs.constants.F_OK);
    await fs.promises.rm(
      path.join(__dirname, 'project-dist'),
      {recursive: true}
    );
  } catch (err) {
    if (err) console.log('');
  } finally {
    await fs.promises.mkdir(path.join(__dirname, 'project-dist'));
    const isHTMLBundled = await bundleHTML();
    const isStylesBundled = await bundleStyles();
    const isDirCopy = await copyDir(
      path.join(__dirname, 'assets'),
      path.join(__dirname, 'project-dist', 'assets')
    );

    if (isHTMLBundled && isDirCopy && isStylesBundled) console.log('The created and copied files are at the project-dist folder');
  }
})();