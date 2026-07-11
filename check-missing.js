const fs = require('fs');
const ts = require('typescript');

let data = fs.readFileSync('src/lib/data.ts', 'utf8');

// A reliable way is to split by "name: " and check if the next properties before the next "name: " or "]" contain "image: "
const parts = data.split('name: ');
const missing = [];
// Skip the first part before the first name
for (let i = 1; i < parts.length; i++) {
  const part = parts[i];
  // Extract the name string which is in quotes
  const match = part.match(/^\s*"([^"]+)"/);
  if (match) {
    const name = match[1];
    // We only care about products. We know it's a product if it has a 'slug:' and 'brand:' or 'shortDescription:' etc.
    if (part.includes('slug:') && part.includes('description:')) {
      if (!part.includes('image:')) {
        missing.push(name);
      }
    }
  }
}
console.log("Products missing image:", missing);
