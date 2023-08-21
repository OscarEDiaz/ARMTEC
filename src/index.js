import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/root.css';
import './styles/canvas.css';
import { MainCanvas } from './components/MainCanvas';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainCanvas />
  </React.StrictMode>
);
