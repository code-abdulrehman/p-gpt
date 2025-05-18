import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LandingPage from './components/LandingPage'

// Main entry point for the application
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);

// Render the landing page
root.render(
  <StrictMode>
    <LandingPage />
  </StrictMode>
);

// Export the components for library usage
export { default as PGPT } from './components/PGPT';