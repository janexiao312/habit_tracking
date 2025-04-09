import React from 'react';
import { Container, Typography, Box, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSelector, useDispatch } from 'react-redux';
import { toggleHabit } from '../store/habitSlice';
import { RootState } from '../store';
import { format } from 'date-fns';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const habits = useSelector((state: RootState) => state.habits.habits);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date: Date | null) => {
    if (date) setSelectedDate(date);
  };

  const handleDayChange = (direction: 'backward' | 'forward') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + (direction === 'backward' ? -1 : 1));
    setSelectedDate(newDate);
  };

  const handleToggleHabit = (habitId: string) => {
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    dispatch(toggleHabit(habitId, dateStr));
  };

  const isHabitCompletedOnDate = (habit: any, date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return habit.completions[dateStr] || false;
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Box sx={{ textAlign: 'center', mt: 4, mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Daily Habit Tracker
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: 2,
            mt: 3,
            mb: 4 
          }}>
            <Button 
              variant="outlined" 
              onClick={() => handleDayChange('backward')}
            >
              Previous Day
            </Button>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={handleDateChange}
              sx={{ width: 200 }}
            />
            <Button 
              variant="outlined" 
              onClick={() => handleDayChange('forward')}
            >
              Next Day
            </Button>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Habit</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {habits.map((habit) => (
                <TableRow 
                  key={habit.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {habit.name}
                  </TableCell>
                  <TableCell align="center">
                    {isHabitCompletedOnDate(habit, selectedDate) ? 
                      '✅ Completed' : 
                      '⭕ Not Completed'
                    }
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color={isHabitCompletedOnDate(habit, selectedDate) ? "error" : "success"}
                      onClick={() => handleToggleHabit(habit.id)}
                      size="small"
                    >
                      {isHabitCompletedOnDate(habit, selectedDate) ? 'Undo' : 'Complete'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        {habits.length === 0 && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No habits added yet. Go to Settings to add some habits!
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Home;
