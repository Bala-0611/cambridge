const College = require('../models/College');

const addCollege = async (req, res) => {
  try {
    const { name, location } = req.body;
    const college = new College({ name, location });
    await college.save();
    res.status(201).json({ message: 'College added', college });
  } catch (err) {
    res.status(500).json({ message: 'Error adding college' });
  }
};

const getColleges = async (req, res) => {
  try {
    const colleges = await College.find();
    res.status(200).json(colleges);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching colleges' });
  }
};

module.exports = { addCollege, getColleges };
