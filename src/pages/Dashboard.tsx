import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Paper, Typography, Box, Grid, Card, CardContent } from '@mui/material';
import { LocalFireDepartment, TrendingUp, CheckCircle } from '@mui/icons-material';
import { RootState } from '../store';
import HabitChart from '../components/HabitChart';
import { calculateWeeklyStats, calculateCurrentStreak, calculateCompletionRate } from '../utils/habitStats';

const Dashboard = () => {
  const habits = useSelector((state: RootState) => state.habits.habits);
  const weeklyStats = calculateWeeklyStats(habits);
  const currentStreak = calculateCurrentStreak(habits);
  const completionRate = calculateCompletionRate(habits);

  const weeklyChartData = {
    labels: weeklyStats.map(stat => stat.day),
    datasets: [
      {
        label: 'Completion Rate',
        data: weeklyStats.map(stat => stat.percentage),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2
      }
    ]
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value: number) => `${value}%`
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Weekly Habit Completion'
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Completion: ${context.parsed.y.toFixed(1)}%`
        }
      }
    }
  };

  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Habit Tracking Dashboard
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <LocalFireDepartment color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h5" component="div">
                  Current Streak
                </Typography>
                <Typography variant="h3" color="primary">
                  {currentStreak}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  days in a row
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <CheckCircle color="success" sx={{ fontSize: 40 }} />
                <Typography variant="h5" component="div">
                  Completion Rate
                </Typography>
                <Typography variant="h3" color="success">
                  {completionRate.toFixed(1)}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  habits completed
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <TrendingUp color="info" sx={{ fontSize: 40 }} />
                <Typography variant="h5" component="div">
                  Total Habits
                </Typography>
                <Typography variant="h3" color="info">
                  {habits.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  tracked habits
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper elevation={3} sx={{ p: 3 }}>
          <HabitChart
            type="line"
            data={weeklyChartData}
            options={chartOptions}
            height={400}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard;
