import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-root-images',
      closeBundle() {
        const srcDir = path.resolve(__dirname, 'images');
        const destDir = path.resolve(__dirname, 'dist', 'images');
        if (fs.existsSync(srcDir)) {
          if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
          }
          fs.cpSync(srcDir, destDir, { recursive: true });
        }
      }
    }
  ]
});
