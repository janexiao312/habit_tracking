import React, { useState } from 'react';
import { Container, Paper, Typography, Box, Button, TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addHabit, removeHabit } from '../store/habitSlice';

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const habits = useSelector((state: RootState) => state.habits.habits);
  const [newHabit, setNewHabit] = useState('');

  const handleAddHabit = () => {
    if (newHabit.trim()) {
      dispatch(addHabit({ name: newHabit }));
      setNewHabit('');
    }
  };

  const handleRemoveHabit = (id: string) => {
    dispatch(removeHabit(id));
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Settings
          </Typography>
          <Typography variant="body1">
            Customize your habit list below.
          </Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
          <TextField
            label="New Habit"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleAddHabit} sx={{ mt: 2 }}>
            Add Habit
          </Button>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Current Habits</Typography>
          <ul>
            {habits.map((habit) => (
              <li key={habit.id}>
                {habit.name}
                <Button
                  variant="text"
                  color="secondary"
                  onClick={() => handleRemoveHabit(habit.id)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </Box>
      </Paper>
    </Container>
  );
};

export default Settings;
