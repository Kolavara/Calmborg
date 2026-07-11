const fs = require('fs');

let data = fs.readFileSync('src/lib/data.ts', 'utf8');
const catRegex = /productItems:\s*\[([\s\S]*?)\]/g;
let catMatch;
let missingImages = [];

while ((catMatch = catRegex.exec(data)) !== null) {
  const itemsText = catMatch[1];
  const prodRegex = /\{\s*name:\s*"([^"]+)"[\s\S]*?\}/g;
  let prodMatch;
  while ((prodMatch = prodRegex.exec(itemsText)) !== null) {
    const prodStr = prodMatch[0];
    const name = prodMatch[1];
    if (!prodStr.includes('image:')) {
      missingImages.push(name);
    }
  }
}

if (missingImages.length > 0) {
  console.log("Products missing image property:", missingImages);
} else {
  console.log("All products have an image property.");
}
