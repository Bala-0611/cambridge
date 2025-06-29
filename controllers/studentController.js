import Student from '../models/student.js';

export const addStudent = async (req, res) => {
  try {
    const { name, department, college } = req.body;

    if (!name || !college) {
      return res.status(400).json({ message: 'Name and college are required' });
    }

    const newStudent = new Student({ name, department, college });
    await newStudent.save();

    res.status(201).json({ message: 'Student added successfully', student: newStudent });
  } catch (error) {
    res.status(500).json({ message: 'Error adding student', error: error.message });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('college');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error: error.message });
  }
};
