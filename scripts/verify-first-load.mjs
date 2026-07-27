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

async function readGlbJson(relativePath) {
  const buffer = await readFile(path.join(projectRoot, relativePath))
  assert(
    buffer.toString('utf8', 0, 4) === 'glTF',
    `${relativePath} is not a valid binary glTF file.`,
  )

  const jsonLength = buffer.readUInt32LE(12)
  return JSON.parse(buffer.toString('utf8', 20, 20 + jsonLength).trim())
}

const html = await read('dist/index.html')
const headers = await read('dist/_headers')

assert(
  !html.includes('initial-shell') &&
    !html.includes('Starting the interactive desk') &&
    !html.includes('background: #0b0b0b'),
  'The removed startup screen has returned to dist/index.html.',
)

assert(
  html.includes('name="theme-color" content="#f7f7f4"') &&
    html.includes('radial-gradient(circle at top, #fff, #f7f7f4 58%, #edede8 100%)'),
  'The inline first-frame background no longer matches the existing loading experience.',
)

const stylesheetMatch = html.match(
  /<link rel="stylesheet" crossorigin href="([^"]+)"/,
)
assert(stylesheetMatch, 'The production stylesheet could not be found.')

const criticalCss = await read(
  path.join('dist', stylesheetMatch[1].replace(/^\//, '')),
)
assert(
  criticalCss.includes('.loading-screen') &&
    criticalCss.includes('.loading-screen-exiting'),
  'The existing loading experience is no longer available in the critical stylesheet.',
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

const sceneSource = await read('src/Scene3D.tsx')
const couchSource = await read('src/components/CouchScene.tsx')
assert(
  sceneSource.includes('<SiegeTankModel') &&
    sceneSource.includes('<CouchScene') &&
    !sceneSource.includes('galleryRequested') &&
    !couchSource.includes('loadDevices'),
  'The complete gallery is no longer part of the initial scene.',
)

for (const modelFile of [
  'src/components/SiegeTankModel.tsx',
  'src/components/PSPModel.tsx',
  'src/components/Nintendo3DSModel.tsx',
]) {
  const source = await read(modelFile)
  assert(
    !source.includes('useGLTF.preload'),
    `${modelFile} starts loading outside the rendered scene lifecycle.`,
  )
}

const modelPaths = [
  'public/models/macbook_pro_m3.glb',
  'public/models/siege_tank.glb',
  'public/models/sony_psp.glb',
  'public/models/nintendo_3ds_xl.glb',
]
const modelBytes = (
  await Promise.all(modelPaths.map(async (modelPath) => (await stat(modelPath)).size))
).reduce((sum, size) => sum + size, 0)

assert(
  modelBytes < 8_000_000,
  `Initial 3D models regressed to ${modelBytes} bytes (limit: 8000000).`,
)

const macbookGlb = await readGlbJson('public/models/macbook_pro_m3.glb')
const macbookNodeNames = new Set(macbookGlb.nodes?.map((node) => node.name))
assert(
  macbookGlb.extensionsRequired?.includes('EXT_meshopt_compression') &&
    ['Object_123', 'Object_127', 'Object_129'].every((name) => macbookNodeNames.has(name)),
  'The compressed MacBook no longer preserves the screen meshes used by the desk experience.',
)

const tankGlb = await readGlbJson('public/models/siege_tank.glb')
const tankAnimationNames = new Set(tankGlb.animations?.map((animation) => animation.name))
assert(
  tankGlb.extensionsRequired?.includes('EXT_meshopt_compression') &&
    tankAnimationNames.has('Armature_Stand Work Start_full') &&
    tankAnimationNames.has('Armature_Stand Work End_full'),
  'The compressed tank no longer preserves the siege animations.',
)

console.log(
  `First-load verification passed (${criticalBytes} critical JS bytes; ${modelBytes} model bytes).`,
)
