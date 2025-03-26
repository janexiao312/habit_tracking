import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import HabitForm from '../components/HabitForm';
import HabitList from '../components/HabitList';
import WeekAtAGlance from '../components/WeekAtAGlance';

const Home: React.FC = () => {
  return (
    <Container>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Home
        </Typography>
        <Typography variant="body1">
          Welcome to the Habit Tracker app!
        </Typography>
      </Box>
      <WeekAtAGlance />
    </Container>
  );
};

export default Home;
