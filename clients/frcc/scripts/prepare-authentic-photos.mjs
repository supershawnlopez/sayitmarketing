import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Conventional pixel adjustments only. No generation, inpainting, face restoration,
// AI upscaling, object removal, compositing, or changes to scene geometry.
const root = fileURLToPath(new URL('../../', import.meta.url));
const inputs = path.join(root, 'output/frcc-photos/originals');
const outputs = path.join(root, 'site/public/images');
const archive = path.join(root, 'output/frcc-photos/authentic-v3');
await mkdir(archive, { recursive: true });
const plans = [
  { name: 'frcc-home-authentic-v3', source: 6, ceiling: true, crop: { left: 0, top: 65, width: 1080, height: 460 } },
  { name: 'frcc-about-authentic-v3', source: 3, ceiling: true, crop: { left: 0, top: 60, width: 1080, height: 465 } },
  { name: 'frcc-contact-authentic-v3', source: 2, ceiling: true, crop: { left: 0, top: 30, width: 1080, height: 495 } },
  { name: 'frcc-events-authentic-v3', source: 5, ceiling: true, crop: { left: 0, top: 55, width: 1080, height: 470 } },
  { name: 'frcc-prayer-authentic-v3', source: 7, ceiling: true },
  { name: 'frcc-community-authentic-v3', source: 4, ceiling: true, crop: { left: 0, top: 145, width: 540, height: 360 } },
  // Stop above the promotional lettering. The original face, gesture and screen remain.
  { name: 'frcc-teaching-authentic-v3', source: 8, crop: { left: 0, top: 40, width: 781, height: 530 } },
  // Crop the flyer below the portrait; retain the original photographic pixels.
  { name: 'frcc-pastors-authentic-v3', source: 1, portrait: true, crop: { left: 0, top: 0, width: 480, height: 270 } },
];

for (const plan of plans) {
  const source = path.join(inputs, `${plan.source}-Photo-${plan.source}.jpg`);
  const { data, info } = await sharp(source).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let y = 0; y < info.height; y++) {
    // Feather a modest reduction across the existing ceiling, not across faces.
    const t = Math.min(1, y / 155);
    const ceilingGain = plan.ceiling ? 0.73 + 0.27 * t * t * (3 - 2 * t) : 1;
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * info.channels;
      const luminance = data[i] * 0.2126 + data[i + 1] * 0.7152 + data[i + 2] * 0.0722;
      const highlightGain = 1 - 0.085 * Math.max(0, (luminance - 165) / 90);
      const saturation = plan.portrait ? 0.98 : 0.94;
      const gain = ceilingGain * highlightGain * (plan.portrait ? 1 : 0.97);
      for (let c = 0; c < 3; c++) {
        const warm = c === 0 ? 1.015 : c === 2 ? 0.99 : 1;
        const value = luminance + (data[i + c] - luminance) * saturation;
        data[i + c] = Math.max(0, Math.min(255, Math.round(value * gain * warm)));
      }
    }
  }
  let image = sharp(data, { raw: info });
  if (plan.crop) image = image.extract(plan.crop);
  const png = await image.png().toBuffer();
  await writeFile(path.join(archive, `${plan.name}.png`), png);
  const result = await sharp(png).webp({ quality: 94 }).toFile(path.join(outputs, `${plan.name}.webp`));
  plan.width = result.width;
  plan.height = result.height;
  console.log(plan.name, result.width, result.height, result.size);
}
await writeFile(path.join(archive, 'manifest.json'), JSON.stringify({
  method: 'Deterministic RGB tonal/color adjustment and crop of original JPEG pixels; no generative processing.',
  plans,
}, null, 2) + '\n');
