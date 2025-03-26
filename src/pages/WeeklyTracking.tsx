import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const WeeklyTracking: React.FC = () => {
  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 2 }}>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Weekly Tracking
        </Typography>
        <Typography variant="body1">
          Track your weekly habits here.
        </Typography>
      </Box>
      </Paper>
    </Container>
  );
};

export default WeeklyTracking;
