import { configureStore } from '@reduxjs/toolkit';
import habitReducer from './habitSlice';
import authReducer from './authSlice';

// Create store with debugging
const store = configureStore({
  reducer: {
    habits: habitReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  devTools: true,
});

// Debug: Log state changes
store.subscribe(() => {
  const state = store.getState();
  console.log('Redux Store Updated:', state);
  
  // Verify localStorage sync
  const storedHabits = localStorage.getItem('habits');
  console.log('localStorage habits:', storedHabits);
  
  // Verify they match
  if (storedHabits) {
    const parsedStoredHabits = JSON.parse(storedHabits);
    console.log('Redux and localStorage in sync:', 
      JSON.stringify(state.habits.habits) === JSON.stringify(parsedStoredHabits)
    );
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
