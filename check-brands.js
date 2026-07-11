const fs = require('fs');

let data = fs.readFileSync('src/lib/data.ts', 'utf8');

const prodRegex = /\{\s*name:\s*"([^"]+)"[\s\S]*?\}/g;
let prodMatch;

console.log("--- Checking Products ---");
while ((prodMatch = prodRegex.exec(data)) !== null) {
  const prodStr = prodMatch[0];
  const name = prodMatch[1];
  
  let brandMatch = prodStr.match(/brand:\s*"([^"]+)"/);
  let brand = brandMatch ? brandMatch[1] : null;
  
  let imgMatch = prodStr.match(/image:\s*"([^"]+)"/);
  let img = imgMatch ? imgMatch[1] : null;
  
  if (img && brand) {
    if (img.toLowerCase().includes('ushinka') && !brand.toLowerCase().includes('ushinka')) {
      console.log(`Mismatch! Product: ${name}, Brand: ${brand}, Image: ${img}`);
    } else if (img.toLowerCase().includes('showa') && !brand.toLowerCase().includes('showa')) {
      console.log(`Mismatch! Product: ${name}, Brand: ${brand}, Image: ${img}`);
    } else if (img.toLowerCase().includes('mst') && !brand.toLowerCase().includes('mst')) {
      console.log(`Mismatch! Product: ${name}, Brand: ${brand}, Image: ${img}`);
    } else if (img.toLowerCase().includes('erowa') && !brand.toLowerCase().includes('erowa')) {
      console.log(`Mismatch! Product: ${name}, Brand: ${brand}, Image: ${img}`);
    } else if (img.toLowerCase().includes('nikken') && !brand.toLowerCase().includes('nikken')) {
      console.log(`Mismatch! Product: ${name}, Brand: ${brand}, Image: ${img}`);
    } else if (img.toLowerCase().includes('blum') && !brand.toLowerCase().includes('blum')) {
      console.log(`Mismatch! Product: ${name}, Brand: ${brand}, Image: ${img}`);
    } else if (img.toLowerCase().includes('yamawa') && !brand.toLowerCase().includes('yamawa')) {
      console.log(`Mismatch! Product: ${name}, Brand: ${brand}, Image: ${img}`);
    }
  }
}
console.log("--- Done Checking ---");
