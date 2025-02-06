import { build } from 'esbuild'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const shared = {
  entryPoints: ['src/messageBroker.js'],
  bundle: true,
  platform: 'node',
  external: ['redis'],
}

// ESM build
build({
  ...shared,
  format: 'esm',
  outfile: 'dist/messageBroker.mjs',
})

// CJS build
build({
  ...shared,
  format: 'cjs',
  outfile: 'dist/messageBroker.cjs',
}) 