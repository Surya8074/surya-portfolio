import React from 'react';
import { createRoot } from 'react-dom/client';
import GenesisCaseStudy from './GenesisCaseStudy';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GenesisCaseStudy />
  </React.StrictMode>,
);
