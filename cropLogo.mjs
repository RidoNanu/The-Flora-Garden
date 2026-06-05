import { Jimp } from 'jimp';

async function crop() {
  try {
    console.log('Reading image...');
    const image = await Jimp.read('src/assets/logo_backup.png');
    console.log('Autocropping...');
    // autocrop() automatically finds the bounding box of non-background pixels
    image.autocrop(); 
    console.log('Writing image...');
    await image.write('src/assets/logo.png');
    console.log('Done!');
  } catch (err) {
    console.error('Error:', err);
  }
}

crop();
