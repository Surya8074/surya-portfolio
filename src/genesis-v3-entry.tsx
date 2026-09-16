import React from 'react';
import { createRoot } from 'react-dom/client';
import GenesisV3 from './GenesisV3';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GenesisV3 />
  </React.StrictMode>,
);
