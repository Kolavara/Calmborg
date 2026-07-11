process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const https = require('https');
const fs = require('fs');

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const categories = [
    'https://orioninnotech.com/product-category/tool-holders/',
    'https://orioninnotech.com/product-category/inserts-for-die-mold/',
    'https://orioninnotech.com/product-category/shrink-fit-holders/',
    'https://orioninnotech.com/product-category/work-holders-for-5-axis-machines/',
    'https://orioninnotech.com/product-category/measuring-touch-probes/',
    'https://orioninnotech.com/product-category/roughing-finishing-boring-holders/',
    'https://orioninnotech.com/product-category/magnetic-beds-lifts/',
    'https://orioninnotech.com/product-category/mst/',
    'https://orioninnotech.com/product-category/showa-tools/',
    'https://orioninnotech.com/product-category/blum-novotest/'
  ];

  let results = {};

  for (const url of categories) {
    try {
      console.log('Fetching', url);
      const html = await fetchPage(url);
      
      const productRegex = /<div[^>]*class="[^"]*product[^"]*"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"[\s\S]*?<h5[^>]*>(.*?)<\/h5>/gi;
      let match;
      while ((match = productRegex.exec(html)) !== null) {
        let title = match[2].replace(/<[^>]+>/g, '').trim();
        results[title] = match[1]; // map title to image
      }
    } catch (e) {
      console.error('Error fetching', url, e.message);
    }
  }

  fs.writeFileSync('orion_scraped_products.json', JSON.stringify(results, null, 2));
  console.log(`Found ${Object.keys(results).length} distinct products.`);
}

run();
