const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Make sure these are properly referencing controller functions
router.get('/', studentController.getStudents); // Ensure getAllStudents exists
router.post('/', studentController.addStudent);
router.get('/:id', studentController.getStudentById);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;