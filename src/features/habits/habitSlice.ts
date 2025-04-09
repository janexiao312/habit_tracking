import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosConfig';

export interface HabitEntry {
  date: string;
  value: number;
  note?: string;
}

export interface Habit {
  _id: string;
  name: string;
  type: 'sleep' | 'water' | 'exercise' | 'break' | 'standing';
  target: number;
  unit: string;
  entries: HabitEntry[];
  user: string;
}

interface HabitState {
  habits: Habit[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: HabitState = {
  habits: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Get user habits
export const getHabits = createAsyncThunk('habits/getAll', async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get('/habits');
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Create habit
export const createHabit = createAsyncThunk(
  'habits/create',
  async (habitData: Omit<Habit, '_id' | 'user' | 'entries'>, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/habits', habitData);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add habit entry
export const addHabitEntry = createAsyncThunk(
  'habits/addEntry',
  async (
    {
      habitId,
      entryData,
    }: {
      habitId: string;
      entryData: Omit<HabitEntry, 'id'>;
    },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.post(`/habits/${habitId}/entries`, entryData);
      return { habitId, habit: response.data };
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update habit
export const updateHabit = createAsyncThunk(
  'habits/update',
  async (
    {
      habitId,
      habitData,
    }: {
      habitId: string;
      habitData: Partial<Omit<Habit, '_id' | 'user'>>;
    },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.put(`/habits/${habitId}`, habitData);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete habit
export const deleteHabit = createAsyncThunk(
  'habits/delete',
  async (habitId: string, thunkAPI) => {
    try {
      await axiosInstance.delete(`/habits/${habitId}`);
      return habitId;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Get habits
      .addCase(getHabits.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHabits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.habits = action.payload;
      })
      .addCase(getHabits.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Create habit
      .addCase(createHabit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createHabit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.habits.push(action.payload);
      })
      .addCase(createHabit.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Add entry
      .addCase(addHabitEntry.fulfilled, (state, action) => {
        const index = state.habits.findIndex(
          (habit) => habit._id === action.payload.habitId
        );
        if (index !== -1) {
          state.habits[index] = action.payload.habit;
        }
      })
      // Update habit
      .addCase(updateHabit.fulfilled, (state, action) => {
        const index = state.habits.findIndex(
          (habit) => habit._id === action.payload._id
        );
        if (index !== -1) {
          state.habits[index] = action.payload;
        }
      })
      // Delete habit
      .addCase(deleteHabit.fulfilled, (state, action) => {
        state.habits = state.habits.filter(
          (habit) => habit._id !== action.payload
        );
      });
  },
});

export const { reset } = habitSlice.actions;
export default habitSlice.reducer;
