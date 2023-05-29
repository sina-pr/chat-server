const express = require('express');

const {
  getAllUsers,
  getUserById,
  deleteUser,
  createUser,
  updateUser,
} = require('../controllers/users');
const {
  authorizeBearerToken,
  authorizeRole,
} = require('../middlewares/jsonwebtoken');

// initialize router
const router = express.Router();

router.get(
  '/getAll',
  [authorizeBearerToken, authorizeRole(['ADMIN'])],
  getAllUsers
);
router.get('/:id', getUserById);
router.delete('/delete/:id', [authorizeBearerToken], deleteUser);
router.post('/createByAdmin', [authorizeBearerToken], createUser);
router.put('/updateByAdmin', [authorizeBearerToken], updateUser);

module.exports = router;
