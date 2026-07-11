process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const https = require('https');

https.get('https://orioninnotech.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const imgRegex = /<img[^>]*src="([^"]+)"[^>]*>/gi;
    let match;
    const images = new Set();
    while ((match = imgRegex.exec(data)) !== null) {
      if (match[1].endsWith('.jpg') || match[1].endsWith('.jpeg') || match[1].endsWith('.png')) {
        images.add(match[1]);
      }
    }
    console.log(Array.from(images).join('\n'));
  });
});
