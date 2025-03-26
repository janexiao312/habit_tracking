import React from 'react';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSelector, useDispatch } from 'react-redux';
import { toggleHabit } from '../store/habitSlice';
import { RootState } from '../store';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const habits = useSelector((state: RootState) => state.habits.habits);
  const [viewMode, setViewMode] = React.useState<'week' | 'month'>('week');
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date: Date | null) => {
    if (date) setSelectedDate(date);
  };

  const handleDayChange = (direction: 'backward' | 'forward') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + (direction === 'backward' ? -1 : 1));
    setSelectedDate(newDate);
  };

  const getFilteredHabits = () => {
    const today = new Date(selectedDate);
    const range = viewMode === 'week' ? 7 : 30;
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - range);

    return habits.filter((habit) => {
      const habitDate = new Date(habit.date);
      return habitDate >= startDate && habitDate <= today;
    });
  };

  const filteredHabits = getFilteredHabits();

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Home
          </Typography>
          <Typography variant="h6" gutterBottom>
            {selectedDate.toLocaleDateString()}
          </Typography>
          <Typography variant="body1">
            Track your daily habits below.
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center', mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button variant="contained" onClick={() => handleDayChange('backward')}>
            Previous Day
          </Button>
          <DatePicker
            value={selectedDate}
            onChange={(date: Date | null) => handleDateChange(date)}
            slotProps={{ textField: { fullWidth: true } }}
          />
          <Button variant="contained" onClick={() => handleDayChange('forward')}>
            Next Day
          </Button>
        </Box>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <button onClick={() => setViewMode(viewMode === 'week' ? 'month' : 'week')}>
            Switch to {viewMode === 'week' ? 'Monthly' : 'Weekly'} View
          </button>
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
            {filteredHabits.map((habit) => (
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
