import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    addHabit: (state, action: PayloadAction<Habit>) => {
      state.habits.push(action.payload);
    },
    toggleHabit: (state, action: PayloadAction<string>) => {
      const habit = state.habits.find((habit) => habit.id === action.payload);
      if (habit) {
        habit.completed = !habit.completed;
      }
    },
  },
});

export const { addHabit, toggleHabit } = habitSlice.actions;
export default habitSlice.reducer;
