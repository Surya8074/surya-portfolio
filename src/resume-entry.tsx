import React from 'react';
import { createRoot } from 'react-dom/client';
import ResumePage from './ResumePage';
import './resume-page.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ResumePage />
  </React.StrictMode>
);
