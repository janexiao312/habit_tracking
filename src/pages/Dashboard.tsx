import React from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';

const Dashboard = () => {
  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Habit Tracking Dashboard
          </Typography>
          <Typography variant="body1">
            Here you can see an overview of your habits.
          </Typography>
        </Box>
        {/* Add more components and UI elements as needed */}
      </Paper>
    </Container>
  );
};

export default Dashboard;
