import React from 'react';
import HabitForm from '../components/HabitForm';
import HabitList from '../components/HabitList';
import WeekAtAGlance from '../components/WeekAtAGlance';
export {};

const Home: React.FC = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the Habit Tracker app!</p>
      <WeekAtAGlance />
    </div>
  );
};

export default Home;
