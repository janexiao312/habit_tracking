import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Container, Paper, Typography, Box, Button, TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addHabit, removeHabit, reorderHabits } from '../store/habitSlice';

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const habits = useSelector((state: RootState) => state.habits.habits);
  const [newHabit, setNewHabit] = useState('');
  console.log('Habits state:', habits);

  const handleAddHabit = () => {
    if (newHabit.trim()) {
      dispatch(addHabit({ name: newHabit }));
      setNewHabit('');
    }
  };

  const handleRemoveHabit = (id: string) => {
    dispatch(removeHabit(id));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = habits.findIndex((habit) => habit.id === active.id);
      const newIndex = habits.findIndex((habit) => habit.id === over.id);
      const reorderedHabits = arrayMove(habits, oldIndex, newIndex);
      dispatch(reorderHabits(reorderedHabits));
    }
  };

  const SortableItem = ({ id, name }: { id: string; name: string }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      padding: '8px',
      margin: '4px 0',
      backgroundColor: '#f0f0f0',
      border: '1px solid #ccc',
      borderRadius: '4px',
      cursor: 'grab',
    };

    return (
      <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {name}
        <Button variant="text" color="secondary" onClick={() => handleRemoveHabit(id)}>
          Remove
        </Button>
      </li>
    );
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <Container>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Settings
            </Typography>
            <Typography variant="body1">
              Customize your habit list below.
            </Typography>
          </Box>
          <Box sx={{ mt: 4 }}>
            <TextField
              label="New Habit"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleAddHabit} sx={{ mt: 2 }}>
              Add Habit
            </Button>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Current Habits</Typography>
            <SortableContext items={habits.map((habit) => habit.id)} strategy={verticalListSortingStrategy}>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                {habits.map((habit) => (
                  <SortableItem key={habit.id} id={habit.id} name={habit.name} />
                ))}
              </ul>
            </SortableContext>
          </Box>
        </Paper>
      </Container>
    </DndContext>
  );
};

export default Settings;
