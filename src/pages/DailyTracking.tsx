import React, { useState } from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';

const DailyTracking: React.FC = () => {
  const [sleepHours, setSleepHours] = useState('');
  const [sleepQuality, setSleepQuality] = useState('');
  const [waterIntake, setWaterIntake] = useState('');
  const [exerciseType, setExerciseType] = useState('');
  const [exerciseDuration, setExerciseDuration] = useState('');
  const [exerciseIntensity, setExerciseIntensity] = useState('');
  const [breaks, setBreaks] = useState('');
  const [standingCount, setStandingCount] = useState('');
  const [standingDuration, setStandingDuration] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Daily Tracking
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Did you get at least 7.5 hours of sleep?</label>
            <input
              type="checkbox"
              checked={sleepHours === 'yes'}
              onChange={(e) => setSleepHours(e.target.checked ? 'yes' : 'no')}
            />
          </div>
          <div>
            <label>Sleep Quality (1-10):</label>
            <input
              type="number"
              value={sleepQuality}
              onChange={(e) => setSleepQuality(e.target.value)}
              min="1"
              max="10"
              required
            />
          </div>
          <div>
            <label>Water Intake (ml):</label>
            <input
              type="number"
              value={waterIntake}
              onChange={(e) => setWaterIntake(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Exercise Type:</label>
            <input
              type="text"
              value={exerciseType}
              onChange={(e) => setExerciseType(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Exercise Duration (minutes):</label>
            <input
              type="number"
              value={exerciseDuration}
              onChange={(e) => setExerciseDuration(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Exercise Intensity (1-10):</label>
            <input
              type="number"
              value={exerciseIntensity}
              onChange={(e) => setExerciseIntensity(e.target.value)}
              min="1"
              max="10"
            />
          </div>
          <div>
            <label>Breaks Taken (frequency and duration):</label>
            <input
              type="text"
              value={breaks}
              onChange={(e) => setBreaks(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Standing Count:</label>
            <input
              type="number"
              value={standingCount}
              onChange={(e) => setStandingCount(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Standing Duration (minutes):</label>
            <input
              type="number"
              value={standingDuration}
              onChange={(e) => setStandingDuration(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </Paper>
    </Container>
  );
};

export default DailyTracking;
