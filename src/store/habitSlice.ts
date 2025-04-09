import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
export {};

export interface HabitCompletion {
  date: string;
  completed: boolean;
}

export interface Habit {
  id: string;
  name: string;
  completions: { [date: string]: boolean };  // Store completion status by date
  date: string;  // Creation date
}

interface HabitState {
  habits: Habit[];
}

const loadHabitsFromStorage = (): Habit[] => {
  try {
    const storedHabits = localStorage.getItem('habits');
    if (!storedHabits) {
      console.log('No habits found in localStorage');
      return [];
    }
    const parsedHabits = JSON.parse(storedHabits);
    console.log('Loaded habits from storage:', parsedHabits);
    if (!Array.isArray(parsedHabits)) {
      console.log('Stored habits is not an array, returning empty array');
      return [];
    }
    
    // Ensure all habits have a completions object
    return parsedHabits.map(habit => ({
      ...habit,
      completions: habit.completions || {}
    }));
  } catch (error) {
    console.error('Error loading habits from storage:', error);
    return [];
  }
};

const saveHabitsToStorage = (habits: Habit[]) => {
  try {
    if (!Array.isArray(habits)) {
      console.error('Attempted to save non-array habits:', habits);
      return;
    }
    localStorage.setItem('habits', JSON.stringify(habits));
    console.log('Successfully saved habits to storage:', habits);
  } catch (error) {
    console.error('Error saving habits to storage:', error);
  }
};

// Clear any potentially corrupted state
localStorage.removeItem('habits');

const initialState: HabitState = {
  habits: [],
};

const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    logState: (state) => {
      console.log('Current Redux State:', state.habits);
      console.log('localStorage State:', localStorage.getItem('habits'));
    },
    addHabit: {
      reducer(state, action: PayloadAction<Habit>) {
        state.habits.push(action.payload);
        saveHabitsToStorage(state.habits);
      },
      prepare(payload: { name: string }) {
        return {
          payload: {
            id: uuidv4(),
            name: payload.name,
            completions: {},
            date: new Date().toISOString(),
          },
        };
      },
    },
    removeHabit: {
      reducer(state, action: PayloadAction<string>) {
        console.log('Removing habit with ID:', action.payload);
        state.habits = state.habits.filter(habit => habit.id !== action.payload);
        saveHabitsToStorage(state.habits);
      },
      prepare(id: string) {
        return { payload: id };
      },
    },
    reorderHabits: {
      reducer(state, action: PayloadAction<Habit[]>) {
        state.habits = action.payload;
        saveHabitsToStorage(state.habits);
      },
      prepare(habits: Habit[]) {
        return { payload: habits };
      },
    },
    toggleHabit: {
      reducer(state, action: PayloadAction<{ id: string, date: string }>) {
        const { id, date } = action.payload;
        const habit = state.habits.find(h => h.id === id);
        if (habit) {
          // Toggle completion for specific date
          habit.completions[date] = !habit.completions[date];
          saveHabitsToStorage(state.habits);
        }
      },
      prepare(id: string, date: string) {
        return { payload: { id, date } };
      },
    },
  },
});

export const { addHabit, removeHabit, toggleHabit, reorderHabits, logState } = habitSlice.actions;
export default habitSlice.reducer;
