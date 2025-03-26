import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleHabit } from '../store/habitSlice';
export {};

interface Habit {
  id: string;
  name: string;
  completed: boolean;
}

const HabitList: React.FC = () => {
  const habits = useSelector((state: RootState) => state.habits.habits as Habit[]);
  const dispatch = useDispatch();

  return (
    <ul>
      {habits.map((habit: Habit) => (
        <li key={habit.id}>
          <label>
            <input
              type="checkbox"
              checked={habit.completed}
              onChange={() => dispatch(toggleHabit(habit.id))}
            />
            {habit.name}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default HabitList;
