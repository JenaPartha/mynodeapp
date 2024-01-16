const User = require('../models/user.model');
const Joi = require('joi');

const userShema = Joi.object({
  username: Joi.string().alphanum().min(3).max(300).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
})

const createUser = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });

    const {error, value } = userShema.validate(req.body);

    
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
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
