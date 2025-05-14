import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [form, setForm] = useState({ date: '', time: '', message: '', method: 'email' });
  const [reminders, setReminders] = useState([]);

  const fetchReminders = async () => {
    const res = await axios.get('http://localhost:5000/api/reminders');
    setReminders(res.data);
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/reminders', form);
    setForm({ date: '', time: '', message: '', method: 'email' });
    fetchReminders();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Remind Me Later</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow p-4 rounded">
        <input type="date" className="w-full mb-2 p-2 border" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
        <input type="time" className="w-full mb-2 p-2 border" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} required />
        <textarea className="w-full mb-2 p-2 border" placeholder="Reminder message..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required></textarea>
        <select className="w-full mb-2 p-2 border" value={form.method} onChange={e => setForm({ ...form, method: e.target.value })}>
          <option value="email">Email</option>
          <option value="sms">SMS</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Set Reminder</button>
      </form>

      <div className="max-w-md mx-auto mt-6">
        <h2 className="text-xl font-semibold">Upcoming Reminders</h2>
        <ul className="bg-white shadow p-4 mt-2 rounded">
          {reminders.map(r => (
            <li key={r._id} className="border-b py-2">
              {new Date(r.remindAt).toLocaleString()} - {r.message} ({r.method})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;