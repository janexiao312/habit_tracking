import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd';
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

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedHabits = Array.from(habits);
    const [removed] = reorderedHabits.splice(result.source.index, 1);
    reorderedHabits.splice(result.destination.index, 0, removed);

    // Dispatch an action to update the Redux state with the new order
    // Assuming an action like `reorderHabits` exists in habitSlice
    dispatch(reorderHabits(reorderedHabits));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
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
            <Droppable droppableId="habits" isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false}>
              {(provided: DroppableProvided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {habits.map((habit, index) => (
                    <Draggable key={habit.id} draggableId={habit.id} index={index}>
                      {(provided: DraggableProvided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {habit.name}
                          <Button
                            variant="text"
                            color="secondary"
                            onClick={() => handleRemoveHabit(habit.id)}
                          >
                            Remove
                          </Button>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </Box>
        </Paper>
      </Container>
    </DragDropContext>
  );
};

export default Settings;
