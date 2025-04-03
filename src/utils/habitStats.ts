import { Habit } from '../store/habitSlice';
import { format, startOfWeek, eachDayOfInterval, isWithinInterval } from 'date-fns';

export const calculateWeeklyStats = (habits: Habit[]) => {
  const now = new Date();
  const weekStart = startOfWeek(now);
  const weekDays = eachDayOfInterval({
    start: weekStart,
    end: now
  });

  const dailyCompletionData = weekDays.map(day => {
    const dayStr = format(day, 'yyyy-MM-dd');
    const dayHabits = habits.filter(h => h.date.startsWith(dayStr));
    const completed = dayHabits.filter(h => h.completed).length;
    const total = dayHabits.length;
    
    return {
      day: format(day, 'EEE'),
      percentage: total > 0 ? (completed / total) * 100 : 0
    };
  });

  return dailyCompletionData;
};

export const calculateCurrentStreak = (habits: Habit[]) => {
  const habitsByDate = habits.reduce((acc, habit) => {
    const date = habit.date.split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(habit);
    return acc;
  }, {} as Record<string, Habit[]>);

  let streak = 0;
  const dates = Object.keys(habitsByDate).sort().reverse();

  for (const date of dates) {
    const dayHabits = habitsByDate[date];
    const allCompleted = dayHabits.every(h => h.completed);
    
    if (allCompleted) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

export const calculateCompletionRate = (habits: Habit[]) => {
  if (habits.length === 0) return 0;
  const completed = habits.filter(h => h.completed).length;
  return (completed / habits.length) * 100;
};
