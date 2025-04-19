const Student = require('../models/student');

// GET all students
exports.getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

// GET one student
exports.getStudentById = async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.json(student);
};

// POST new student
exports.addStudent = async (req, res) => {
  try {
    console.log("🔵 Request Body:", req.body); // print the data
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({ message: 'Student added successfully' });
  } catch (error) {
    console.error("❌ Error saving student:", error.message);
    console.error("🔴 Full Error:", error);
    res.status(500).json({ error: error.message }); // return error to frontend
  }
};


// PUT update student
exports.updateStudent = async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Student updated successfully' });
};

// DELETE student
exports.deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Student deleted successfully' });
};
