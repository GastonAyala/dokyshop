import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import { fileURLToPath } from 'url';
const { VITE_API_HOST } = import.meta.env

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/dashboard/",
  build: {
    outDir: path.resolve(__dirname, '../public/dashboard'),
    emptyOutDir: true
  },
  server: {
    host: true,
    proxy: {
      '/api': {
        target: VITE_API_HOST,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }}
})
