process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const https = require('https');

https.get('https://orioninnotech.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const links = data.match(/href="([^"]+)"/g) || [];
    const productLinks = links.filter(l => l.includes('product') || l.includes('category'));
    console.log(Array.from(new Set(productLinks)).join('\n'));
  });
});
