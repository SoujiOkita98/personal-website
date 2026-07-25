import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'

const projectRoot = process.cwd()
const distRoot = path.join(projectRoot, 'dist')

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

async function read(relativePath) {
  return readFile(path.join(projectRoot, relativePath), 'utf8')
}

const html = await read('dist/index.html')
const headers = await read('dist/_headers')

assert(
  !html.includes('initial-shell') &&
    !html.includes('Starting the interactive desk') &&
    !html.includes('background: #0b0b0b'),
  'The removed startup screen has returned to dist/index.html.',
)

const modulePreloads = [...html.matchAll(/rel="modulepreload"[^>]+href="([^"]+)"/g)]
  .map((match) => match[1])

assert(
  !modulePreloads.some((href) => href.includes('three-core') || href.includes('three-fiber')),
  'Three.js is being preloaded before the interactive scene is requested.',
)

const entryMatch = html.match(/<script type="module" crossorigin src="([^"]+)"/)
assert(entryMatch, 'The production entry script could not be found.')

const criticalScripts = [entryMatch[1], ...modulePreloads]
const criticalBytes = (
  await Promise.all(
    criticalScripts.map(async (assetPath) => {
      const asset = await stat(path.join(distRoot, assetPath.replace(/^\//, '')))
      return asset.size
    }),
  )
).reduce((sum, size) => sum + size, 0)

assert(
  criticalBytes < 300_000,
  `Critical JavaScript regressed to ${criticalBytes} bytes (limit: 300000).`,
)

assert(
  headers.includes('/assets/*') &&
    headers.includes('max-age=31536000, immutable') &&
    headers.includes('/index.html') &&
    headers.includes('max-age=0, must-revalidate'),
  'Production cache rules are incomplete.',
)

for (const modelFile of [
  'src/components/SiegeTankModel.tsx',
  'src/components/PSPModel.tsx',
  'src/components/Nintendo3DSModel.tsx',
]) {
  const source = await read(modelFile)
  assert(
    !source.includes('useGLTF.preload'),
    `${modelFile} eagerly preloads a non-critical gallery model.`,
  )
}

console.log(`First-load verification passed (${criticalBytes} critical JS bytes).`)
