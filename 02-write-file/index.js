const { stdout, stdin } = process;
const fs = require('fs');
const path = require('path');

process.on('exit', () => {
  stdout.write('Bye!');
});

process.on('SIGINT', () => process.exit());

fs.open(
  path.join(__dirname, 'text.txt'),
  'w',
  err => {
    if (err) throw err;
  }
);

stdout.write('Please enter your text:\n');

stdin.on('data', data => {
  const string = data.toString();
  
  if (string.trim() === 'exit') {
    process.exit();
  } else {
    fs.appendFile(
      path.join(__dirname, 'text.txt'),
      string,
      err => {
        if (err) throw err;
      }
    )
  }
});