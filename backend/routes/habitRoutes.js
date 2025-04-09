import express from 'express';
import {
  getHabits,
  createHabit,
  addEntry,
  updateHabit,
  deleteHabit,
} from '../controllers/habitController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all routes
router.use(protect);

router.route('/').get(getHabits).post(createHabit);
router.route('/:id').put(updateHabit).delete(deleteHabit);
router.post('/:id/entries', addEntry);

export default router;
