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
  habits: [],
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
