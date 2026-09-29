import React from 'react';
import { MotionConfig } from 'motion/react';
import { createRoot } from 'react-dom/client';
import ComskiCaseStudyCV2 from './ComskiCaseStudyCV2';
import './cv2-design-system/tokens.css';
import './cv2-design-system/surfaces.css';
import './cv2-case-study.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <ComskiCaseStudyCV2 />
    </MotionConfig>
  </React.StrictMode>
);
