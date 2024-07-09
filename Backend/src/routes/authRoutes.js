const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
require('dotenv').config();

const User = require('../models/user');

const createToken = (id, username, authType) => {
  return jwt.sign(
    { 
      id,
      username,
      authType
    }, 
    process.env.SECRET_KEY, 
    { 
      expiresIn: 30 * 24 * 60 * 60 * 1000 //30 days
    }
  );
}

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const isDuplicate = await User.findOne({ username });
    if (isDuplicate) {
      return res.status(400).json({'success': false, 'message': 'Username is already taken'});
    }

    const user = await User.create({ username, password });
    const token = createToken(user._id, user.username, 'userpass');

    res.cookie('jwt', token, { secure: true, httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 }); //cookie expires after 30 days
    res.status(201).json({ 'success': true, user });
  } 
  catch (e) {
    return res.status(500).json({ 'success': false, 'error': e.message });
  }
});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({username});

    if (!user) {
      return res.status(400).json({ 'success': false, 'message': 'Username or password is incorrect' })  
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(400).json({ 'success': false, 'message': 'Username or password is incorrect' });
    }

    const token = createToken(user._id, user.username, 'userpass');
    res.cookie('jwt', token, { secure: true, httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 }); //cookie expires after 30 days
    res.status(200).json({ 'success': true , 'message': 'Signed in successfully' });
  }
  catch (e) {
    return res.status(500).json({ 'success': false, 'error': e.message });
  }
});

module.exports = router;