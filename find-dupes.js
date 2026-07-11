const fs = require('fs');
let data = fs.readFileSync('src/lib/data.ts', 'utf8');

const prodRegex = /name:\s*"([^"]+)"[\s\S]*?image:\s*"([^"]+)"/g;
let prodMatch;
const images = {};

while ((prodMatch = prodRegex.exec(data)) !== null) {
  const name = prodMatch[1];
  const image = prodMatch[2];
  if (!images[image]) {
    images[image] = [];
  }
  images[image].push(name);
}

for (const [img, prods] of Object.entries(images)) {
  if (prods.length > 1) {
    console.log(`\nImage: ${img}\nProducts: ${prods.join(', ')}`);
  }
}
