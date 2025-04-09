import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Button,
  useTheme
} from '@mui/material';
import { RootState, AppDispatch } from '../store';
import { logout } from '../store/authSlice';
import {
  Home as HomeIcon,
  Today as TodayIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  InsertChartOutlined as WeeklyIcon,
  CheckCircleOutline as LogoIcon
} from '@mui/icons-material';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const { user } = useSelector((state: RootState) => state.auth);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Only show these nav items if user is logged in
  const navItems = user ? [
    { path: '/', label: 'Home', icon: <HomeIcon /> },
    { path: '/daily-tracking', label: 'Daily', icon: <TodayIcon /> },
    { path: '/weekly-tracking', label: 'Weekly', icon: <WeeklyIcon /> },
    { path: '/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { path: '/settings', label: 'Settings', icon: <SettingsIcon /> },
  ] : [];

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        background: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>
        {/* Logo and Brand */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          color: theme.palette.primary.main,
          mr: 4
        }}>
          <LogoIcon sx={{ fontSize: 32, mr: 1 }} />
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.energy.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            HabitFlow
          </Typography>
        </Box>

        {/* Navigation Items */}
        <Box sx={{ display: 'flex', gap: 1, flexGrow: 1 }}>
          {navItems.map(({ path, label, icon }) => (
            <Button
              key={path}
              component={Link}
              to={path}
              startIcon={icon}
              sx={{
                color: isActive(path) 
                  ? theme.palette.primary.main 
                  : theme.palette.text.secondary,
                backgroundColor: isActive(path) 
                  ? theme.palette.primary.main + '10'
                  : 'transparent',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: isActive(path)
                    ? theme.palette.primary.main + '20'
                    : theme.palette.action.hover,
                },
                textTransform: 'none',
                px: 2,
                py: 1,
              }}
            >
              {label}
            </Button>
          ))}
        </Box>

        {/* Auth Buttons */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {user ? (
            <>
              <Typography sx={{ alignSelf: 'center', mr: 2 }}>
                Welcome, {user.name}
              </Typography>
              <Button
                onClick={handleLogout}
                variant="outlined"
                color="primary"
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                color="primary"
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
