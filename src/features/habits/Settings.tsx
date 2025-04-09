import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Box, Button, TextField, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addHabit, removeHabit, reorderHabits, logState } from '../store/habitSlice';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const habits = useSelector((state: RootState) => state.habits.habits);
  const [newHabit, setNewHabit] = useState('');

  useEffect(() => {
    console.log('Settings component mounted/updated');
    dispatch(logState());
  }, [dispatch, habits]);

  const handleAddHabit = () => {
    if (newHabit.trim()) {
      dispatch(addHabit({ name: newHabit }));
      setNewHabit('');
      dispatch(logState());
    }
  };

  const handleRemoveHabit = (id: string) => {
    console.log('Delete button clicked for habit ID:', id);
    dispatch(removeHabit(id));
    dispatch(logState());
  };

  const moveHabit = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < habits.length) {
      const reorderedHabits = [...habits];
      const temp = reorderedHabits[index];
      reorderedHabits[index] = reorderedHabits[newIndex];
      reorderedHabits[newIndex] = temp;
      dispatch(reorderHabits(reorderedHabits));
      dispatch(logState());
    }
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Settings
          </Typography>
          <Typography variant="body1">
            Customize your habit list below. Use arrows to reorder habits.
          </Typography>
        </Box>
        
        <Box sx={{ mt: 4 }}>
          <TextField
            label="New Habit"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            fullWidth
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAddHabit} 
            sx={{ mt: 2 }}
          >
            Add Habit
          </Button>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Current Habits</Typography>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            {habits.map((habit, index) => (
              <li 
                key={habit.id}
                style={{
                  padding: '8px',
                  margin: '4px 0',
                  backgroundColor: '#f0f0f0',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box display="flex" alignItems="center">
                    <Box>
                      <IconButton 
                        size="small" 
                        onClick={() => moveHabit(index, 'up')}
                        disabled={index === 0}
                      >
                        <ArrowUpwardIcon />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => moveHabit(index, 'down')}
                        disabled={index === habits.length - 1}
                      >
                        <ArrowDownwardIcon />
                      </IconButton>
                    </Box>
                    <span style={{ marginLeft: '12px' }}>{habit.name}</span>
                  </Box>
                  <Button 
                    variant="contained" 
                    color="error" 
                    size="small"
                    onClick={() => handleRemoveHabit(habit.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </li>
            ))}
          </ul>
        </Box>
      </Paper>
    </Container>
  );
};

export default Settings;
