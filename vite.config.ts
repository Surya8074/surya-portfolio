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
        genesisV3: 'work/genesis-v3/index.html',
        genesisV4: 'work/genesis-v4/index.html',
        genesisV5: 'work/genesis-v5/index.html',
      },
    },
  },
});
