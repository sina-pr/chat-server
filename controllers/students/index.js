const Student = require('../../models/Student');

async function getAllStudents(req, res, next) {
  const students = await Student.find();
  console.log(students);

  res.status(200).json({
    message: 'Student List fetched successfully',
    data: students,
  });
}
async function getStudentByStid(req, res, next) {
  const { stid } = req.params;

  try {
    const student = await Student.findOne({ stid });
    if (student) {
      res.status(200).json({
        message: 'Student fetched successfully',
        data: student,
      });
    }
    res.status(404).json({
      message: `Student with stid:${stid} doesn't exist.`,
    });
  } catch {
    res.status(400).json({
      message: 'Something went wrong!',
    });
  }
}

async function createStudent(req, res, next) {
  const { stid, stname, stfamily } = req.body;
  const newStudent = new Student({
    stid,
    stname,
    stfamily,
  });
  await newStudent.save();
  res.status(200).json({
    message: 'Student created successfully',
    data: newStudent,
  });
}

async function deleteStudent(req, res, next) {
  const { stid } = req.params;
  console.log(stid);
  const student = await Student.deleteOne({ stid });
  res.status(200).json({
    message: 'Student deleted successfully',
    data: student,
  });
}

module.exports = {
  getAllStudents,
  getStudentByStid,
  createStudent,
  deleteStudent,
};
