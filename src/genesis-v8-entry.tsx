import React from 'react';
import { createRoot } from 'react-dom/client';
import GenesisV8 from './GenesisV8';
import './genesis-v8.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GenesisV8 />
  </React.StrictMode>,
);
