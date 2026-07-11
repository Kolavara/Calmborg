const fs = require('fs');

let data = fs.readFileSync('src/lib/data.ts', 'utf8');

// Use regex to find all product items within productItems arrays
// Each product item starts with { and has name, slug, image, brand etc.
const productItemsRegex = /productItems:\s*\[([\s\S]*?)\],\s*\n\s*products:/g;
let piMatch;
let allProducts = [];

while ((piMatch = productItemsRegex.exec(data)) !== null) {
  const block = piMatch[1];
  // Now find individual product items
  // Each starts with { name: "..." and ends with },
  const itemRegex = /\{\s*\n?\s*name:\s*"([^"]+)"([\s\S]*?)(?:\n\s*\},|\n\s*\}\s*$)/g;
  let itemMatch;
  while ((itemMatch = itemRegex.exec(block)) !== null) {
    const name = itemMatch[1];
    const body = itemMatch[2];
    
    const slugM = body.match(/slug:\s*"([^"]+)"/);
    const imgM = body.match(/image:\s*"([^"]+)"/);
    const brandM = body.match(/brand:\s*"([^"]+)"/);
    const descM = body.match(/shortDescription:\s*"([^"]+)"/);
    
    allProducts.push({
      name,
      slug: slugM ? slugM[1] : null,
      image: imgM ? imgM[1] : null,
      brand: brandM ? brandM[1] : null,
      shortDesc: descM ? descM[1] : null,
    });
  }
}

console.log(`Total products found: ${allProducts.length}\n`);

console.log("=== ALL PRODUCTS ===\n");
for (let i = 0; i < allProducts.length; i++) {
  const p = allProducts[i];
  const imgShort = p.image ? 
    (p.image.length > 70 ? '...' + p.image.slice(-55) : p.image) : "*** MISSING ***";
  console.log(`${i+1}. ${p.name}`);
  console.log(`   Brand: ${p.brand || 'N/A'}`);
  console.log(`   Image: ${imgShort}`);
  console.log('');
}

// Issues
console.log("\n=== ISSUES ===\n");

const noImg = allProducts.filter(p => !p.image);
if (noImg.length) {
  console.log("MISSING images:");
  noImg.forEach(p => console.log(`  ❌ ${p.name}`));
} else {
  console.log("✅ All products have images");
}

// Duplicates
const imgMap = {};
allProducts.forEach(p => {
  if (p.image) {
    if (!imgMap[p.image]) imgMap[p.image] = [];
    imgMap[p.image].push(p.name);
  }
});
console.log("\nSHARED images (same image on multiple products):");
let dupeCount = 0;
for (const [img, names] of Object.entries(imgMap)) {
  if (names.length > 1) {
    dupeCount++;
    const shortImg = img.length > 60 ? '...' + img.slice(-45) : img;
    console.log(`  🔁 ${shortImg}:`);
    names.forEach(n => console.log(`     - ${n}`));
  }
}
if (!dupeCount) console.log("  ✅ No duplicates found");

// Brand mismatches
console.log("\nBRAND/IMAGE MISMATCHES:");
const brandWords = ['ushinka', 'showa', 'mst', 'erowa', 'nikken', 'blum', 'yamawa', 'aura', 'union'];
let mismatchCount = 0;
for (const p of allProducts) {
  if (p.image && p.brand) {
    const imgL = p.image.toLowerCase();
    const brandL = p.brand.toLowerCase();
    for (const kw of brandWords) {
      if (imgL.includes(kw) && !brandL.includes(kw)) {
        console.log(`  ⚠️ ${p.name}: Brand="${p.brand}" but image has "${kw}"`);
        mismatchCount++;
      }
    }
  }
}
if (!mismatchCount) console.log("  ✅ No brand mismatches");
