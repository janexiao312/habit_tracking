import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { toggleHabit } from '../store/habitSlice';
import { RootState } from '../store';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const habits = useSelector((state: RootState) => state.habits.habits);

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Home
          </Typography>
          <Typography variant="body1">
            Track your daily habits below.
          </Typography>
        </Box>
        <table>
          <thead>
            <tr>
              <th>Habit</th>
              <th>Completed</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {habits.map((habit) => (
              <tr key={habit.id}>
                <td>{habit.name}</td>
                <td>{habit.completed ? 'Yes' : 'No'}</td>
                <td>
                  <button onClick={() => dispatch(toggleHabit(habit.id))}>
                    {habit.completed ? 'Undo' : 'Complete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>
    </Container>
  );
};

export default Home;
