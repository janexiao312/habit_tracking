import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleHabit, Habit } from '../store/habitSlice';
import { RootState } from '../store';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Button,
  Typography,
  Box
} from '@mui/material';
import { format, eachDayOfInterval, subDays } from 'date-fns';

const WeekAtAGlance: React.FC = () => {
  const dispatch = useDispatch();
  const habits = useSelector((state: RootState) => state.habits.habits);

  const getWeekData = () => {
    const today = new Date();
    const weekInterval = {
      start: subDays(today, 6),
      end: today
    };

    return eachDayOfInterval(weekInterval).map(date => {
      const dateStr = format(date, 'yyyy-MM-dd');
      return {
        date,
        dateStr,
        habits: habits.map(habit => ({
          ...habit,
          isCompleted: habit.completions[dateStr] || false
        }))
      };
    });
  };

  const weekData = getWeekData();

  const handleToggle = (habitId: string, date: string) => {
    dispatch(toggleHabit(habitId, date));
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Week at a Glance
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Habit</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {weekData.map((day) => (
              <React.Fragment key={day.dateStr}>
                {day.habits.map((habit, index) => (
                  <TableRow key={`${day.dateStr}-${habit.id}`}>
                    {index === 0 && (
                      <TableCell rowSpan={day.habits.length}>
                        {format(day.date, 'MMM d, yyyy')}
                      </TableCell>
                    )}
                    <TableCell>{habit.name}</TableCell>
                    <TableCell align="center">
                      {habit.isCompleted ? '✅' : '⭕'}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        size="small"
                        color={habit.isCompleted ? "error" : "success"}
                        onClick={() => handleToggle(habit.id, day.dateStr)}
                      >
                        {habit.isCompleted ? 'Undo' : 'Complete'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default WeekAtAGlance;
