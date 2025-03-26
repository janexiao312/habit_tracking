import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const WeeklyTracking: React.FC = () => {
  return (
    <Container>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Weekly Tracking
        </Typography>
        <Typography variant="body1">
          Track your weekly habits here.
        </Typography>
      </Box>
    </Container>
  );
};

export default WeeklyTracking;
