import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleHabit, Habit } from '../store/habitSlice';
import { Box, Checkbox, FormControlLabel, List, ListItem } from '@mui/material';
import { format } from 'date-fns';

const HabitList: React.FC = () => {
  const habits = useSelector((state: RootState) => state.habits.habits);
  const dispatch = useDispatch();
  const today = format(new Date(), 'yyyy-MM-dd');

  const isHabitCompletedToday = (habit: Habit) => {
    return habit.completions[today] || false;
  };

  const handleToggle = (habitId: string) => {
    dispatch(toggleHabit(habitId, today));
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <List>
        {habits.map((habit) => (
          <ListItem key={habit.id} divider>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isHabitCompletedToday(habit)}
                  onChange={() => handleToggle(habit.id)}
                  color="primary"
                />
              }
              label={habit.name}
              sx={{ width: '100%' }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default HabitList;
