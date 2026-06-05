import https from 'https';
import fs from 'fs';
import path from 'path';

const downloadImage = (url, filepath) => {
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
        let redirectUrl = res.headers.location;
        if (redirectUrl.startsWith('/')) {
            redirectUrl = 'https://images.unsplash.com' + redirectUrl;
        }
        downloadImage(redirectUrl, filepath).then(resolve).catch(reject);
      } else {
        res.resume();
        reject(new Error(`Status: ${res.statusCode} for ${url}`));
      }
    }).on('error', reject);
  });
};

const verifiedPlantIds = [
  '1416862291207-4ca732144d83',
  '1491147334573-44cbb4602074',
  '1512428559087-560fa5ceab42',
  '1483794344563-d27a8d18014e',
  '1545165375-1b744b9ed444',
  '1497250681960-ef046c08a56e'
];

const homeImages = [
  { id: '1512428559087-560fa5ceab42', path: 'public/images/hero/hero-bouquet.jpg' },
  { id: '1416862291207-4ca732144d83', path: 'public/images/about/story-image.jpg' },
  { id: '1497250681960-ef046c08a56e', path: 'public/images/hero/seasonal-banner.jpg' },
  { id: '1491147334573-44cbb4602074', path: 'public/images/categories/roses.jpg' },
  { id: '1483794344563-d27a8d18014e', path: 'public/images/categories/orchids.jpg' },
  { id: '1545165375-1b744b9ed444', path: 'public/images/categories/bouquets.jpg' }
];

async function run() {
  console.log('Downloading 16 product images using VERIFIED plant IDs...');
  for (let i = 1; i <= 16; i++) {
    const id = verifiedPlantIds[i % verifiedPlantIds.length];
    const imgUrl = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&h=800&q=80`;
    const filepath = path.join(process.cwd(), `public/images/products/product-${i}.jpg`);
    try {
      await downloadImage(imgUrl, filepath);
      console.log(`Downloaded product-${i}`);
    } catch (e) {
      console.error(`Failed product-${i}: ${e.message}`);
    }
  }

  console.log('Downloading home and category images using VERIFIED plant IDs...');
  for (const img of homeImages) {
    const imgUrl = `https://images.unsplash.com/photo-${img.id}?auto=format&fit=crop&w=1200&q=80`;
    const filepath = path.join(process.cwd(), img.path);
    try {
      await downloadImage(imgUrl, filepath);
      console.log(`Downloaded ${img.path}`);
    } catch (e) {
      console.error(`Failed ${img.path}: ${e.message}`);
    }
  }
}

run();
