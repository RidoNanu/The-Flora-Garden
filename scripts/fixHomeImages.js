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

const imagesToFix = [
  { url: 'https://loremflickr.com/800/1000/indoorplant,monstera?lock=201', path: 'public/images/hero/hero-bouquet.jpg' },
  { url: 'https://loremflickr.com/800/1000/greenhouse,plants?lock=202', path: 'public/images/about/story-image.jpg' },
  { url: 'https://loremflickr.com/1200/600/nursery,plants?lock=203', path: 'public/images/hero/seasonal-banner.jpg' },
  { url: 'https://loremflickr.com/600/800/plant,succulent?lock=204', path: 'public/images/categories/roses.jpg' },
  { url: 'https://loremflickr.com/600/800/indoorplant,ficus?lock=205', path: 'public/images/categories/orchids.jpg' },
  { url: 'https://loremflickr.com/600/800/fern,plant?lock=206', path: 'public/images/categories/bouquets.jpg' },
  { url: 'https://loremflickr.com/200/200/woman,portrait,smiling?lock=107', path: 'public/images/testimonials/user1.jpg' },
  { url: 'https://loremflickr.com/200/200/man,portrait,smiling?lock=108', path: 'public/images/testimonials/user2.jpg' },
];

async function run() {
  console.log('Downloading fixed home images...');
  for (const img of imagesToFix) {
    const filepath = path.join(process.cwd(), img.path);
    try {
      await downloadImage(img.url, filepath);
      console.log(`Downloaded ${img.path}`);
    } catch (e) {
      console.error(`Failed ${img.path}: ${e.message}`);
    }
  }
}

run();
