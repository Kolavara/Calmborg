const fs = require('fs');
const path = require('path');

const dir = 'public/images/products/';
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.match(/_\d+\.png$/)) {
    const newName = file.replace(/_\d+\.png$/, '.png');
    // if newName exists, delete it first
    if (fs.existsSync(path.join(dir, newName))) {
        fs.unlinkSync(path.join(dir, newName));
    }
    fs.renameSync(path.join(dir, file), path.join(dir, newName));
    console.log(`Renamed ${file} to ${newName}`);
  }
});
