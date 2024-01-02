import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    host: true,
    strictPort: true,
    port: 8080,
  },
});
