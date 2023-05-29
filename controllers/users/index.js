const User = require('../../models/User');
const bcrypt = require('bcrypt');

async function getAllUsers(req, res, next) {
  const users = await User.find();
  console.log(users);

  res.status(200).json({
    message: 'User List fetched successfully',
    data: users,
  });
}
async function getUserById(req, res, next) {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id });

    if (user) {
      return res.status(200).json({
        message: 'User fetched successfully',
        data: user,
      });
    }
    res.status(404).json({
      message: `User with id:${id} doesn't exist.`,
    });
  } catch {
    res.status(400).json({
      message: 'Something went wrong!',
    });
  }
}

async function createUser(req, res, next) {
  try {
    const { username, email, password, role } = req.body;

    // Verify account username as unique
    const existingAccount = await User.findOne({ username });
    if (existingAccount) {
      return response.status(400).json({
        error: username,
        message: 'An account already exists with that "username"',
      });
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create account
    const newAccount = new User({
      username,
      email,
      password: hash,
      isAdmin: role === 'ADMIN',
    });
    await newAccount.save();

    // Remove password from response data
    newAccount.password = undefined;
    delete newAccount.password;

    res.status(201).json({
      message: 'Succesfully registered',
      data: newAccount,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
}

async function deleteUser(req, res, next) {
  const { id } = req.params;

  const user = await User.deleteOne({ id });
  res.status(200).json({
    message: 'User deleted successfully',
    data: user,
  });
}

async function updateUser(req, res, next) {
  try {
    const { username, email, id, role } = req.body;
    console.log(id);
    await User.findOneAndUpdate(
      { _id: id },
      { $set: { username, email, isAdmin: role === 'ADMIN' } }
    );
    res.status(200).json({
      message: 'User updated successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
