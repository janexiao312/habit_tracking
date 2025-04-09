import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import DailyTracking from './pages/DailyTracking';
import WeeklyTracking from './pages/WeeklyTracking'; // Import the new WeeklyTracking page
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from './theme';
import useMediaQuery from '@mui/material/useMediaQuery';
import './App.css';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = prefersDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
          <Router>
            <Navigation />
            <Box sx={{ paddingTop: '40px' }}>
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/daily-tracking" element={<DailyTracking />} />
              <Route path="/weekly-tracking" element={<WeeklyTracking />} /> {/* New Route */}
              </Routes>
            </Box>
          </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
