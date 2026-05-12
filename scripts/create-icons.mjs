/**
 * Generates simple solid-color PNG icons using only Node.js built-ins.
 * Run: node scripts/create-icons.mjs
 */
import { createDeflateRaw } from 'zlib'
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public', 'icons')
mkdirSync(publicDir, { recursive: true })

function crc32(buf) {
  const table = new Uint32Array(256)
  for (let i = 0; i < 256; i++) {
    let c = i
    for (let j = 0; j < 8; j++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1)
    table[i] = c
  }
  let crc = 0xffffffff
  for (const byte of buf) crc = table[(crc ^ byte) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii')
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const crcData = Buffer.concat([typeBytes, data])
  const crcVal = Buffer.alloc(4)
  crcVal.writeUInt32BE(crc32(crcData))
  return Buffer.concat([len, typeBytes, data, crcVal])
}

async function createPNG(size, r, g, b) {
  // IHDR
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8   // bit depth
  ihdr[9] = 2   // color type: RGB
  ihdr[10] = 0  // compression
  ihdr[11] = 0  // filter
  ihdr[12] = 0  // interlace

  // Raw image data: one filter byte (0) + RGB per row
  const row = Buffer.alloc(1 + size * 3)
  row[0] = 0  // filter none
  for (let x = 0; x < size; x++) {
    row[1 + x * 3] = r
    row[2 + x * 3] = g
    row[3 + x * 3] = b
  }
  const raw = Buffer.concat(Array(size).fill(row))

  const compressed = await new Promise((resolve, reject) => {
    const deflate = createDeflateRaw()
    const chunks = []
    deflate.on('data', (d) => chunks.push(d))
    deflate.on('end', () => resolve(Buffer.concat(chunks)))
    deflate.on('error', reject)
    deflate.end(raw)
  })

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

const icon192 = await createPNG(192, 15, 23, 42)   // slate-950 approx
writeFileSync(join(publicDir, 'icon-192.png'), icon192)

const icon512 = await createPNG(512, 15, 23, 42)
writeFileSync(join(publicDir, 'icon-512.png'), icon512)

console.log('✓ Icons written to public/icons/')
