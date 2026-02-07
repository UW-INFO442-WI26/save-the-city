import { GlobalStyles } from '@mui/material';

const globalStyles = {
  // Custom scrollbar styles
  '*::-webkit-scrollbar': {
    width: '8px',
    height: '8px',
  },
  '*::-webkit-scrollbar-track': {
    background: '#f1f1f1',
  },
  '*::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '4px',
  },
  '*::-webkit-scrollbar-thumb:hover': {
    background: '#555',
  },

  // Remove default margin/padding
  'html, body': {
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
  },

  // Set box-sizing globally
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },

  // Smooth scrolling
  'html': {
    scrollBehavior: 'smooth',
  },

  // Add any other global styles your team needs
};

export default function AppGlobalStyles() {
  return <GlobalStyles styles={globalStyles} />;
}