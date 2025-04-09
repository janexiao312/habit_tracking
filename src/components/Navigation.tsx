import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Button,
  useTheme
} from '@mui/material';
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
  const theme = useTheme();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home', icon: <HomeIcon /> },
    { path: '/daily-tracking', label: 'Daily', icon: <TodayIcon /> },
    { path: '/weekly-tracking', label: 'Weekly', icon: <WeeklyIcon /> },
    { path: '/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { path: '/settings', label: 'Settings', icon: <SettingsIcon /> },
  ];

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
        <Box sx={{ display: 'flex', gap: 1 }}>
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
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
