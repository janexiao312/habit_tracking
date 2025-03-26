import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [goalSleepHours, setGoalSleepHours] = useState(7.5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div>
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Goal Sleep Hours:</label>
          <input
            type="number"
            value={goalSleepHours}
            onChange={(e) => setGoalSleepHours(parseFloat(e.target.value))}
            required
          />
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default Settings;
