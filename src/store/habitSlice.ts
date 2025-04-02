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

const loadHabitsFromStorage = (): Habit[] => {
  const storedHabits = localStorage.getItem('habits');
  return storedHabits ? JSON.parse(storedHabits) : [];
};

const saveHabitsToStorage = (habits: Habit[]) => {
  localStorage.setItem('habits', JSON.stringify(habits));
};

const initialState: HabitState = {
  habits: loadHabitsFromStorage(),
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
      saveHabitsToStorage(state.habits);
    },
    reorderHabits: (state, action: PayloadAction<Habit[]>) => {
      state.habits = action.payload;
      saveHabitsToStorage(state.habits);
    },
    removeHabit: (state, action: PayloadAction<string>) => {
      state.habits = state.habits.filter((habit) => habit.id !== action.payload);
      saveHabitsToStorage(state.habits);
    },
    toggleHabit: (state, action: PayloadAction<string>) => {
      const habit = state.habits.find((habit) => habit.id === action.payload);
      if (habit) {
        habit.completed = !habit.completed;
      }
      saveHabitsToStorage(state.habits);
    },
  },
});

export const { addHabit, removeHabit, toggleHabit, reorderHabits } = habitSlice.actions;
export default habitSlice.reducer;
