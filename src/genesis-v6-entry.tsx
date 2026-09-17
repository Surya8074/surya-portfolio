import React from 'react';
import { createRoot } from 'react-dom/client';
import GenesisV6 from './GenesisV6';
import './genesis-v6.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GenesisV6 />
  </React.StrictMode>,
);
