import React from 'react';
import { createRoot } from 'react-dom/client';
import GenesisV5 from './GenesisV5';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GenesisV5 />
  </React.StrictMode>,
);
