import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const f of files) {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      await walkDir(dirPath, callback);
    } else {
      await callback(path.join(dir, f));
    }
  }
}

(async () => {
  console.log("Resizing public images to max 800px to reduce mobile lag...");
  await walkDir('./public/images', async (filePath) => {
    if (filePath.endsWith('.webp')) {
      const tempPath = filePath + '.tmp';
      try {
        await sharp(filePath)
          .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 75 })
          .toFile(tempPath);
        fs.renameSync(tempPath, filePath);
        console.log(`Resized ${filePath}`);
      } catch(e) {
        console.log(`Failed ${filePath}: ${e.message}`);
      }
    }
  });
  
  console.log("Resizing asset images...");
  await walkDir('./src/assets', async (filePath) => {
    if (filePath.endsWith('.webp')) {
      const tempPath = filePath + '.tmp';
      try {
        await sharp(filePath)
          .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 75 })
          .toFile(tempPath);
        fs.renameSync(tempPath, filePath);
        console.log(`Resized ${filePath}`);
      } catch(e) {
        console.log(`Failed ${filePath}: ${e.message}`);
      }
    }
  });
  
  console.log("Done!");
})();
