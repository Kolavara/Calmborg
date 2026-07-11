const fs = require('fs');

let data = fs.readFileSync('src/lib/data.ts', 'utf8');

const categoryRegex = /title:\s*"([^"]+)"[\s\S]*?image:\s*"([^"]+)"/g;
let catMatch;
console.log("--- CATEGORIES ---");
while ((catMatch = categoryRegex.exec(data)) !== null) {
  console.log(`Category: ${catMatch[1]} -> ${catMatch[2]}`);
}
