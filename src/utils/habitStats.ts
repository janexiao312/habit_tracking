import { Habit } from '../store/habitSlice';
import { format, eachDayOfInterval, subDays, isSameDay, parseISO } from 'date-fns';

export const calculateDailyStats = (habits: Habit[], days: number = 7) => {
  const today = new Date();
  const interval = {
    start: subDays(today, days - 1),
    end: today
  };
  
  return eachDayOfInterval(interval).map(day => {
    const dayStr = format(day, 'yyyy-MM-dd');
    const dayHabits = habits;
    const completed = dayHabits.filter(h => h.completions[dayStr]).length;
    const total = dayHabits.length;
    
    return {
      date: day,
      completed,
      total,
      percentage: total > 0 ? (completed / total) * 100 : 0
    };
  });
};

export const calculateStreak = (habits: Habit[]): number => {
  let streak = 0;
  const today = new Date();

  // Get all unique dates from habits' completions
  const allDates = new Set<string>();
  habits.forEach(habit => {
    Object.keys(habit.completions).forEach(date => allDates.add(date));
  });

  // Convert to array and sort in descending order
  const dates = Array.from(allDates).sort((a, b) => b.localeCompare(a));

  // If no dates with completions, return 0
  if (dates.length === 0) return 0;

  // Start from the most recent date
  for (let i = 0; i < dates.length; i++) {
    const currentDate = parseISO(dates[i]);
    
    // Break if we hit a day where not all habits were completed
    const allCompleted = habits.every(habit => habit.completions[dates[i]]);
    if (!allCompleted) break;

    // If we're checking beyond yesterday, break
    if (i > 0 && !isSameDay(currentDate, subDays(parseISO(dates[i-1]), 1))) {
      break;
    }

    streak++;
  }

  return streak;
};

export const calculateCompletionRate = (habits: Habit[]) => {
  if (habits.length === 0) return 0;

  // Get today's date string
  const today = format(new Date(), 'yyyy-MM-dd');
  
  // Count completed habits for today
  const completed = habits.filter(h => h.completions[today]).length;
  
  return (completed / habits.length) * 100;
};

export const getWeeklyProgress = (habits: Habit[]) => {
  return calculateDailyStats(habits, 7).reduce((acc, day) => {
    return acc + day.percentage;
  }, 0) / 7;
};
