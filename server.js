import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db.js';
import collegeRoutes from './routes/collegeRoutes.js';
import studentRoutes from './routes/studentRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/colleges', collegeRoutes);
app.use('/api/students', studentRoutes);

app.get('/', (req, res) => {
  res.send('CampusBridge API Running ✅');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
