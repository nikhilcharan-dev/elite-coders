import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <App />
);

// strictmode renders twice components to check for clashes and unexpected behaviour