const express = require('express');
const {
  getAllStudents,
  createStudent,
  deleteStudent,
  getStudentById,
  getStudentByStid,
} = require('../controllers/students');

// initialize router
const router = express.Router();

router.get('/getAll', getAllStudents);
router.get('/getByStId/:stid', getStudentByStid);
router.post('/new', createStudent);
router.delete('/delete/:stid', deleteStudent);

module.exports = router;
