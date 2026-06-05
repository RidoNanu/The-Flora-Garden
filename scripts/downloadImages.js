import https from 'https';
import fs from 'fs';
import path from 'path';

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else if (res.statusCode === 301 || res.statusCode === 302) {
        // Handle redirect
        downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
      } else {
        res.resume(); // Consume response data to free up memory
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
};

const images = [
  // Hero
  { url: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=1200&auto=format&fit=crop', path: 'public/images/hero/hero-bouquet.jpg' },
  // About
  { url: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=800&auto=format&fit=crop', path: 'public/images/about/story-image.jpg' },
  // Categories
  { url: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=600&auto=format&fit=crop', path: 'public/images/categories/roses.jpg' },
  { url: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?q=80&w=600&auto=format&fit=crop', path: 'public/images/categories/bouquets.jpg' },
  { url: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?q=80&w=600&auto=format&fit=crop', path: 'public/images/categories/orchids.jpg' },
  // Best Sellers (Products)
  { url: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=600&auto=format&fit=crop', path: 'public/images/products/luxury-rose.jpg' },
  { url: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?q=80&w=600&auto=format&fit=crop', path: 'public/images/products/wedding-elegance.jpg' },
  { url: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=600&auto=format&fit=crop', path: 'public/images/products/anniversary-bloom.jpg' },
  { url: 'https://images.unsplash.com/photo-1457089328109-e5d9bd499191?q=80&w=600&auto=format&fit=crop', path: 'public/images/products/mothers-day.jpg' },
  // Seasonal Banner
  { url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop', path: 'public/images/hero/seasonal-banner.jpg' },
  // Occasions
  { url: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=600&auto=format&fit=crop', path: 'public/images/occasions/birthday.jpg' },
  { url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop', path: 'public/images/occasions/valentines.jpg' },
  { url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600&auto=format&fit=crop', path: 'public/images/occasions/wedding.jpg' },
  // Gallery
  { url: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=400&auto=format&fit=crop', path: 'public/images/gallery/gal1.jpg' },
  { url: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=400&auto=format&fit=crop', path: 'public/images/gallery/gal2.jpg' },
  { url: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=400&auto=format&fit=crop', path: 'public/images/gallery/gal3.jpg' },
  { url: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?q=80&w=400&auto=format&fit=crop', path: 'public/images/gallery/gal4.jpg' },
  // Testimonial Profile Placeholder
  { url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop', path: 'public/images/testimonials/user1.jpg' },
  { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop', path: 'public/images/testimonials/user2.jpg' },
];

async function run() {
  console.log('Downloading images...');
  for (const img of images) {
    try {
      await downloadImage(img.url, path.join(process.cwd(), img.path));
      console.log(`Downloaded ${img.path}`);
    } catch (e) {
      console.error(`Failed to download ${img.path}:`, e.message);
    }
  }
  console.log('Done!');
}

run();
