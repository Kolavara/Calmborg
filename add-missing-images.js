const fs = require('fs');

let data = fs.readFileSync('src/lib/data.ts', 'utf8');

const inserts = {
  'slug: "n-series-micron-chuck"': 'slug: "n-series-micron-chuck",\n        image: "/images/products/milling_chuck.png"',
  'slug: "aura-die-mold-inserts"': 'slug: "aura-die-mold-inserts",\n        image: "https://orioninnotech.com/wp-content/uploads/2020/07/inserts-and-die-mold-orion-group.jpg"',
  'slug: "finishing-inserts-mirror-surface"': 'slug: "finishing-inserts-mirror-surface",\n        image: "/images/products/milling_inserts.png"',
  'slug: "copy-milling-inserts"': 'slug: "copy-milling-inserts",\n        image: "/images/products/milling_inserts.png"'
};

for (const [findStr, replaceStr] of Object.entries(inserts)) {
  data = data.replace(findStr, replaceStr);
}

fs.writeFileSync('src/lib/data.ts', data);
console.log("Added missing image properties");
