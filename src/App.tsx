import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import DailyTracking from './pages/DailyTracking';
import WeeklyTracking from './pages/WeeklyTracking'; // Import the new WeeklyTracking page
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/daily-tracking" element={<DailyTracking />} />
            <Route path="/weekly-tracking" element={<WeeklyTracking />} /> {/* New Route */}
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;

