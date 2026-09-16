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
        genesisStyle2: 'work/genesis-style-2/index.html',
      },
    },
  },
});
