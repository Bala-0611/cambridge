import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: String,
  college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
});

export default mongoose.model('Student', studentSchema);
