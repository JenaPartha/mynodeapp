const User = require('./user.model');

const createUser = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { createUser, getAllUsers };
