import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleHabit } from '../store/habitSlice';
import { RootState } from '../store';
import { Habit } from '../store/habitSlice';
export {};

const WeekAtAGlance: React.FC = () => {
  const dispatch = useDispatch();
  const habits = useSelector((state: RootState) => state.habits.habits as Habit[]);

  const getWeekData = () => {
    const weekData = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayData = habits.filter((habit: Habit) => {
        const habitDate = new Date(habit.date);
        return habitDate.toDateString() === date.toDateString();
      });
      weekData.push({ date, dayData });
    }
    return weekData;
  };

  const weekData = getWeekData();

  return (
    <div>
      <h2>Week at a Glance</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Habit</th>
            <th>Completed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {weekData.map((day) => (
            <tr key={day.date.toDateString()}>
              <td>{day.date.toDateString()}</td>
              <td>{day.dayData.map((habit: Habit) => habit.name).join(', ')}</td>
              <td>{day.dayData.map((habit: Habit) => habit.completed ? 'Yes' : 'No').join(', ')}</td>
              <td>
                {day.dayData.map((habit: Habit) => (
                  <button key={habit.id} onClick={() => dispatch(toggleHabit(habit.id))}>
                    {habit.completed ? 'Undo' : 'Complete'}
                  </button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeekAtAGlance;
