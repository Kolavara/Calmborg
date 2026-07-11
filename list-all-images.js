const fs = require('fs');

let data = fs.readFileSync('src/lib/data.ts', 'utf8');

// Find all categories
const categoryRegex = /title:\s*"([^"]+)"[\s\S]*?image:\s*"([^"]+)"/g;
let catMatch;
console.log("--- CATEGORIES ---");
while ((catMatch = categoryRegex.exec(data)) !== null) {
  console.log(`Category: ${catMatch[1]} -> ${catMatch[2]}`);
}

console.log("\n--- PRODUCTS ---");
const prodRegex = /name:\s*"([^"]+)"[\s\S]*?slug:\s*"[^"]+"[\s\S]*?image:\s*"([^"]+)"/g;
let prodMatch;
while ((prodMatch = prodRegex.exec(data)) !== null) {
  console.log(`Product: ${prodMatch[1]} -> ${prodMatch[2]}`);
}
