process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const https = require('https');

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
    'https://orioninnotech.com/product-category/toolings/',
    'https://orioninnotech.com/product-category/toolings/page/2/',
    'https://orioninnotech.com/product-category/work-holding/',
    'https://orioninnotech.com/product-category/measuring-instruments/',
    'https://orioninnotech.com/product-category/measuring-instruments/page/2/',
    'https://orioninnotech.com/product-category/machine-tools/'
  ];

  let results = [];

  for (const url of categories) {
    try {
      console.log('Fetching', url);
      const html = await fetchPage(url);
      
      const productRegex = /<li[^>]*class="[^"]*product[^"]*"[^>]*>[\s\S]*?<a href="([^"]+)".*?><img[^>]*src="([^"]+)"[\s\S]*?<h2[^>]*>(.*?)<\/h2>/gi;
      let match;
      while ((match = productRegex.exec(html)) !== null) {
        results.push({
          title: match[3].replace(/<[^>]+>/g, '').trim(),
          url: match[1],
          image: match[2]
        });
      }
    } catch (e) {
      console.error('Error fetching', url, e.message);
    }
  }

  const fs = require('fs');
  fs.writeFileSync('orion_scraped_products.json', JSON.stringify(results, null, 2));
  console.log(`Found ${results.length} products.`);
}

run();
