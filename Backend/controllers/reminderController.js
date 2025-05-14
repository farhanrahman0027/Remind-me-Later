import Reminder from '../models/Reminder.js';

export const createReminder = async (req, res) => {
  const { date, time, message, method } = req.body;
  const remindAt = new Date(`${date}T${time}`);

  try {
    const reminder = await Reminder.create({ message, remindAt, method });
    res.status(201).json(reminder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find().sort({ remindAt: 1 });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

