import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

const settings = [48, 72, 96, 144, 180, 192, 256, 384, 512]
const target = process.cwd() + '/public/pwa/icons/icon.png'
const dir = path.parse(target).dir
const filename = path.parse(target).name
const cacheDir = path.join(dir, '../..', '/cache')
const cacheFile = path.join(cacheDir, 'icon-cache.json')

async function ensureDirectoryExists(directory) {
  try {
    await fs.mkdir(directory, { recursive: true })
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err
    }
  }
}

;(async () => {
  let processed = []

  try {
    await ensureDirectoryExists(cacheDir)
    const data = await fs.readFile(cacheFile)
    processed = JSON.parse(data)
  } catch (err) {}

  await Promise.all(
    settings.map(async (size) => {
      const processedSize = processed.find((item) => item.size === size)
      if (processedSize && processedSize.lastModified === (await fs.stat(target)).mtimeMs) {
        return
      }
      await sharp(target).resize({ width: size, height: size }).toFile(`${dir}/${filename}-${size}x${size}.png`)

      processed.push({ size, lastModified: (await fs.stat(target)).mtimeMs })
    }),
  )

  await fs.writeFile(cacheFile, JSON.stringify(processed, null, 2))
})()
