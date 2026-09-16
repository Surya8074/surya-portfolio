import React from 'react';
import { createRoot } from 'react-dom/client';
import GenesisV4 from './GenesisV4';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GenesisV4 />
  </React.StrictMode>,
);
