/**
 * Generates simple PNG icons for the PWA.
 * Run: node scripts/generate-icons.mjs
 */
import { createCanvas } from 'canvas'
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public', 'icons')

mkdirSync(publicDir, { recursive: true })

function generateIcon(size) {
  const canvas = createCanvas(size, size)
  const ctx = canvas.getContext('2d')

  // Background
  ctx.fillStyle = '#0f172a'
  ctx.beginPath()
  ctx.roundRect(0, 0, size, size, size * 0.2)
  ctx.fill()

  // Dumbbell icon
  const s = size / 100
  ctx.fillStyle = '#3b82f6'
  ctx.strokeStyle = '#3b82f6'
  ctx.lineWidth = 8 * s
  ctx.lineCap = 'round'

  // Bar
  ctx.beginPath()
  ctx.moveTo(25 * s, 50 * s)
  ctx.lineTo(75 * s, 50 * s)
  ctx.stroke()

  // Left weight
  ctx.fillRect(15 * s, 35 * s, 10 * s, 30 * s)
  // Right weight
  ctx.fillRect(75 * s, 35 * s, 10 * s, 30 * s)
  // Inner left
  ctx.fillRect(22 * s, 30 * s, 6 * s, 40 * s)
  // Inner right
  ctx.fillRect(72 * s, 30 * s, 6 * s, 40 * s)

  return canvas.toBuffer('image/png')
}

try {
  writeFileSync(join(publicDir, 'icon-192.png'), generateIcon(192))
  writeFileSync(join(publicDir, 'icon-512.png'), generateIcon(512))
  console.log('Icons generated in public/icons/')
} catch (err) {
  console.error('Icon generation failed (canvas not installed). Using placeholder approach.')
  console.log('To generate proper icons, run: npm install canvas && node scripts/generate-icons.mjs')
}
