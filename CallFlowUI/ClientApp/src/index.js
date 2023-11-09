import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AppRoutes from './AppRoutes';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<App/>)


