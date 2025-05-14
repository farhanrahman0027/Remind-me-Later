import express from 'express';
import { createReminder, getReminders } from '../controllers/reminderController.js';
const router = express.Router();

router.post('/', createReminder);
router.get('/', getReminders);

export default router;


