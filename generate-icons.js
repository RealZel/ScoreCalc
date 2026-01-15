const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const iconSizes = {
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192,
};

const sourceIcon = path.join(__dirname, 'icon.png');
const androidResPath = path.join(__dirname, 'android', 'app', 'src', 'main', 'res');

async function generateIcons() {
  for (const [folder, size] of Object.entries(iconSizes)) {
    const outputDir = path.join(androidResPath, folder);
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Generate square icon
    await sharp(sourceIcon)
      .resize(size, size)
      .toFile(path.join(outputDir, 'ic_launcher.png'));
    
    // Generate round icon
    const roundedCorners = Buffer.from(
      `<svg><rect x="0" y="0" width="${size}" height="${size}" rx="${size/2}" ry="${size/2}"/></svg>`
    );
    
    await sharp(sourceIcon)
      .resize(size, size)
      .composite([{
        input: roundedCorners,
        blend: 'dest-in'
      }])
      .toFile(path.join(outputDir, 'ic_launcher_round.png'));
    
    console.log(`Generated ${folder} icons (${size}x${size})`);
  }
  
  console.log('Icon generation complete!');
}

generateIcons().catch(console.error);
