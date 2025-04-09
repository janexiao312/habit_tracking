import asyncHandler from 'express-async-handler';
import Habit from '../models/habitModel.js';

// @desc    Get user habits
// @route   GET /api/habits
// @access  Private
const getHabits = asyncHandler(async (req, res) => {
  const habits = await Habit.find({ user: req.user.id });
  res.status(200).json(habits);
});

// @desc    Create habit
// @route   POST /api/habits
// @access  Private
const createHabit = asyncHandler(async (req, res) => {
  const { name, type, target, unit } = req.body;

  if (!name || !type || !target || !unit) {
    res.status(400);
    throw new Error('Please add all required fields');
  }

  const habit = await Habit.create({
    name,
    type,
    target,
    unit,
    user: req.user.id,
    entries: [],
  });

  res.status(201).json(habit);
});

// @desc    Add habit entry
// @route   POST /api/habits/:id/entries
// @access  Private
const addEntry = asyncHandler(async (req, res) => {
  const habit = await Habit.findById(req.params.id);

  if (!habit) {
    res.status(404);
    throw new Error('Habit not found');
  }

  // Check for user
  if (habit.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const { date, value, note } = req.body;

  if (!date || !value) {
    res.status(400);
    throw new Error('Please provide date and value');
  }

  habit.entries.push({ date, value, note });
  await habit.save();

  res.status(200).json(habit);
});

// @desc    Update habit
// @route   PUT /api/habits/:id
// @access  Private
const updateHabit = asyncHandler(async (req, res) => {
  const habit = await Habit.findById(req.params.id);

  if (!habit) {
    res.status(404);
    throw new Error('Habit not found');
  }

  // Check for user
  if (habit.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedHabit = await Habit.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );

  res.status(200).json(updatedHabit);
});

// @desc    Delete habit
// @route   DELETE /api/habits/:id
// @access  Private
const deleteHabit = asyncHandler(async (req, res) => {
  const habit = await Habit.findById(req.params.id);

  if (!habit) {
    res.status(404);
    throw new Error('Habit not found');
  }

  // Check for user
  if (habit.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await habit.deleteOne();

  res.status(200).json({ id: req.params.id });
});

export { getHabits, createHabit, addEntry, updateHabit, deleteHabit };
