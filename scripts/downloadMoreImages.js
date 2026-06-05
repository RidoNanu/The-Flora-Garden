import https from 'https';
import fs from 'fs';
import path from 'path';

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else if (res.statusCode === 301 || res.statusCode === 302) {
        let redirectUrl = res.headers.location;
        if (redirectUrl.startsWith('/')) {
            redirectUrl = 'https://loremflickr.com' + redirectUrl;
        }
        downloadImage(redirectUrl, filepath).then(resolve).catch(reject);
      } else {
        res.resume();
        reject(new Error(`Status: ${res.statusCode} for ${url}`));
      }
    }).on('error', reject);
  });
};

async function run() {
  console.log('Downloading 16 unique indoor plant and foliage images from LoremFlickr...');
  const keywords = ['indoorplant,monstera', 'succulent,pot', 'fern,plant', 'bonsai,tree', 'cactus,indoor', 'snakeplant,pot', 'ficus,indoor', 'plant,botanical'];
  for (let i = 1; i <= 16; i++) {
    const keyword = keywords[(i - 1) % keywords.length];
    const imgUrl = `https://loremflickr.com/600/800/${keyword}?lock=${i}`;
    const filepath = path.join(process.cwd(), `public/images/products/product-${i}.jpg`);
    try {
      await downloadImage(imgUrl, filepath);
      console.log(`Downloaded product-${i}.jpg`);
    } catch (e) {
      console.error(`Failed product-${i}: ${e.message}`);
    }
  }
}

run();
