import { defineConfig } from 'vitest/config'

import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./__tests__/setup.ts']
  }
})
