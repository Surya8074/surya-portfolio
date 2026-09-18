import React from 'react';
import { createRoot } from 'react-dom/client';
import GenesisV7 from './GenesisV7';
import './genesis-v7.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GenesisV7 />
  </React.StrictMode>,
);
