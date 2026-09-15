import React from 'react';
import { createRoot } from 'react-dom/client';
import GenesisHero from './GenesisHero';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GenesisHero />
  </React.StrictMode>,
);
