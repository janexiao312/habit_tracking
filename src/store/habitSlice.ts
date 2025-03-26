import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
export {};

export interface Habit {
  id: string;
  name: string;
  completed: boolean;
  date: string;
}

interface HabitState {
  habits: Habit[];
}

const initialState: HabitState = {
  habits: [
    { id: '1', name: 'Sleep a solid 7-8 hours', completed: false, date: new Date().toISOString() },
    { id: '2', name: '30 mins+ of cardio + weights', completed: false, date: new Date().toISOString() },
    { id: '3', name: 'Drinked at least 30oz of water', completed: false, date: new Date().toISOString() },
    { id: '4', name: 'Read an article about technology and AI', completed: false, date: new Date().toISOString() },
    { id: '5', name: 'Took fiber, B12, D supplements', completed: false, date: new Date().toISOString() },
  ],
};

const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<{ name: string }>) => {
      const newHabit: Habit = {
        id: uuidv4(),
        name: action.payload.name,
        completed: false,
        date: new Date().toISOString(),
      };
      state.habits.push(newHabit);
    },
    removeHabit: (state, action: PayloadAction<string>) => {
      state.habits = state.habits.filter((habit) => habit.id !== action.payload);
    },
    toggleHabit: (state, action: PayloadAction<string>) => {
      const habit = state.habits.find((habit) => habit.id === action.payload);
      if (habit) {
        habit.completed = !habit.completed;
      }
    },
  },
});

export const { addHabit, removeHabit, toggleHabit } = habitSlice.actions;
export default habitSlice.reducer;
