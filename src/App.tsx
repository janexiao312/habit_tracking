import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';

// Layout
import Navigation from './layout/components/Navigation';

// Feature components
import Home from './features/habits/Home';
import Dashboard from './features/habits/Dashboard';
import Settings from './features/habits/Settings';
import DailyTracking from './features/habits/DailyTracking';
import WeeklyTracking from './features/habits/WeeklyTracking';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import PrivateRoute from './features/auth/PrivateRoute';

// Styles
import { lightTheme, darkTheme } from './shared/styles/theme';
import './shared/styles/App.css';

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
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/" element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              } />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/settings" element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              } />
              <Route path="/daily-tracking" element={
                <PrivateRoute>
                  <DailyTracking />
                </PrivateRoute>
              } />
              <Route path="/weekly-tracking" element={
                <PrivateRoute>
                  <WeeklyTracking />
                </PrivateRoute>
              } />
            </Routes>
          </Box>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
