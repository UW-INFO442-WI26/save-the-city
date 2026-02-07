import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import AppGlobalStyles from './GlobalStyles';

function App() {

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstarts an elegant, consistent, and simple baseline to build upon */}
      <CssBaseline />
      
      {/* Custom global styles */}
      <AppGlobalStyles />
      
      {/* Your app content goes here */}
      <div>
        <h1>Your App</h1>
        {/* Add your routes, pages, components, etc. */}
      </div>
    </ThemeProvider>
  );
}

export default App
