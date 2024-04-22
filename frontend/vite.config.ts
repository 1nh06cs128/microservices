/* import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  // to handle CORS
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    }
  },
  plugins: [
    react(),
    svgr(),
  ],
}) as import('vite').UserConfig;

 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
            // exportAsDefault: true,
            svgrOptions: {
        },
    }),
  ], 
})