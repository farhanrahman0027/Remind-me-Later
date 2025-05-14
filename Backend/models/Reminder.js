import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema({
  message: { type: String, required: true },
  remindAt: { type: Date, required: true },
  method: { type: String, enum: ['email', 'sms'], required: true }
}, { timestamps: true });

const Reminder = mongoose.model('Reminder', reminderSchema);
export default Reminder;