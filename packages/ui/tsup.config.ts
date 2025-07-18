import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/components'],
  splitting: true,
  dts: true,
  outDir: 'dist',
  format: ['esm', 'cjs'],
  skipNodeModulesBundle: true,
  sourcemap: false,
  tsconfig: 'tsconfig.json',
  
  external: ['@iac/tailwind-config'],
  clean: true
})
