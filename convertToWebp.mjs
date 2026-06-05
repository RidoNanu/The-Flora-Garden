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

async function processImages(dir) {
  await walkDir(dir, async (filePath) => {
    if (filePath.match(/\.(jpg|jpeg|png)$/i)) {
      const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      console.log(`Converting ${filePath} to ${webpPath}`);
      await sharp(filePath).webp({ quality: 80 }).toFile(webpPath);
      fs.unlinkSync(filePath);
    }
  });
}

(async () => {
  console.log("Converting public/images...");
  await processImages('./public/images');

  console.log("Converting src/assets...");
  await processImages('./src/assets');

  console.log("Updating all code references...");
  await walkDir('./src', async (filePath) => {
    if (filePath.match(/\.(jsx|js|json|css)$/i)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      let updatedContent = content.replace(/\.jpg/g, '.webp')
                                  .replace(/\.jpeg/g, '.webp')
                                  .replace(/\.png/g, '.webp');
      
      updatedContent = updatedContent.replace(/"\.\/images\//g, '"/The-Flora-Garden/images/');
      updatedContent = updatedContent.replace(/"\/images\//g, '"/The-Flora-Garden/images/');
      updatedContent = updatedContent.replace(/'\.\/images\//g, "'/The-Flora-Garden/images/");
      updatedContent = updatedContent.replace(/'\/images\//g, "'/The-Flora-Garden/images/");

      if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent);
        console.log(`Updated references in ${filePath}`);
      }
    }
  });
  console.log("Done!");
})();
