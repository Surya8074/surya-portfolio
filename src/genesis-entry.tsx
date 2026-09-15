import React from 'react';
import { createRoot } from 'react-dom/client';
import GenesisCaseStudy from './GenesisCaseStudy';
import GenesisTimeline from './GenesisTimeline';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GenesisTimeline>
      <GenesisCaseStudy />
    </GenesisTimeline>
  </React.StrictMode>,
);
