import { readFile, stat } from 'node:fs/promises'
import { createHash } from 'node:crypto'
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
  html.includes('name="theme-color" content="#ffffff"') &&
    html.includes('background: #fff'),
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

for (const preloadUrl of [
  '/models/macbook_pro_m3.glb?v=9e5177f8',
  '/models/siege_tank.glb?v=3f0a0019',
  '/models/sony_psp.glb?v=a9d7013b',
  '/models/nintendo_3ds_xl.glb?v=bf977fc5',
  '/wallpaper.webp?v=9308238a',
]) {
  assert(
    headers.includes(`<${preloadUrl}>; rel=preload; as=fetch;`),
    `${preloadUrl} is no longer preloaded from the home-page response.`,
  )
}

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
  'src/components/MacBookModel.tsx',
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

const expectedModelSizes = new Map([
  [
    'public/models/macbook_pro_m3.glb',
    {
      bytes: 9_755_508,
      sha256: 'd1cd7759d4afe0125211db9dede99e87a8faf89819a188d162c7fedd960d7856',
    },
  ],
  [
    'public/models/siege_tank.glb',
    {
      bytes: 6_668_732,
      sha256: '9b924eca0438cd6f936102ca0238dbf8d55a5c839123a5a78d2b44f041936c0e',
    },
  ],
  [
    'public/models/sony_psp.glb',
    {
      bytes: 1_684_104,
      sha256: 'acd11fde90fe5ac09d3358155465d654b1e5ea5f4e493c8126ac804042b68743',
    },
  ],
  [
    'public/models/nintendo_3ds_xl.glb',
    {
      bytes: 602_224,
      sha256: 'd19e11505851bda921f3f70fb1912029cf81f5a71d02f8aba5a6ead9f6e311da',
    },
  ],
])
const modelBytes = (
  await Promise.all(
    [...expectedModelSizes].map(async ([modelPath, expected]) => {
      const modelStat = await stat(path.join(projectRoot, modelPath))
      assert(
        modelStat.size === expected.bytes,
        `${modelPath} is incomplete or no longer the approved original (${modelStat.size}/${expected.bytes} bytes).`,
      )
      const modelHash = createHash('sha256')
        .update(await readFile(path.join(projectRoot, modelPath)))
        .digest('hex')
      assert(
        modelHash === expected.sha256,
        `${modelPath} no longer matches the approved original model.`,
      )
      return modelStat.size
    }),
  )
).reduce((sum, size) => sum + size, 0)

assert(
  modelBytes === 18_710_568,
  `The complete original model set has an unexpected size (${modelBytes} bytes).`,
)

const macbookGlb = await readGlbJson('public/models/macbook_pro_m3.glb')
const macbookNodeNames = new Set(macbookGlb.nodes?.map((node) => node.name))
assert(
  !macbookGlb.extensionsRequired?.includes('EXT_meshopt_compression') &&
    ['Object_123', 'Object_127', 'Object_129'].every((name) => macbookNodeNames.has(name)),
  'The original MacBook or its screen meshes are no longer intact.',
)

const tankGlb = await readGlbJson('public/models/siege_tank.glb')
const tankAnimationNames = new Set(tankGlb.animations?.map((animation) => animation.name))
assert(
  !tankGlb.extensionsRequired?.includes('EXT_meshopt_compression') &&
    tankAnimationNames.has('Armature_Stand Work Start_full') &&
    tankAnimationNames.has('Armature_Stand Work End_full'),
  'The original tank or its siege animations are no longer intact.',
)

const sceneAssetsSource = await read('src/sceneAssets.ts')
assert(
  sceneAssetsSource.includes('request.onprogress') &&
    sceneAssetsSource.includes('URL.createObjectURL(blob)') &&
    sceneAssetsSource.includes('blob.size !== asset.bytes'),
  'Scene downloads no longer report real bytes or reject incomplete files.',
)

console.log(
  `First-load verification passed (${criticalBytes} critical JS bytes; ${modelBytes} original model bytes).`,
)
