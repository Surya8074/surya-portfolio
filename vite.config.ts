import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/surya-portfolio/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        genesis: 'work/genesis/index.html',
      },
    },
  },
});
