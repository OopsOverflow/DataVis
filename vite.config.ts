import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from "vite-plugin-svgr";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  resolve: {
    alias: {
        '@charts/': new URL('./src/charts/', import.meta.url).pathname,
        '@components/': new URL('./src/components/', import.meta.url).pathname,
        '@type/': new URL('./src/type/', import.meta.url).pathname,
        '@styles/': new URL('./src/styles/', import.meta.url).pathname,
    },
},
})
