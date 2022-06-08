const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({
        errorMessage: 'Please enter valid username or password',
      });

    const existingUser = await User.findOne({
      username: username,
    });
    if (existingUser)
      return res.status(400).json({
        errorMessage: 'An account with this username already exists',
      });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      password: passwordHash,
    });
    const savedUser = await newUser.save();

    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET);
    res
      .cookie('token', token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    res.status(500).send();
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({
        errorMessage: 'Please enter valid username or password',
      });

    const existingUser = await User.findOne({
      username: username,
    });
    if (!existingUser)
      return res.status(401).json({
        errorMessage: 'Incorrect username or password',
      });

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isValidPassword)
      return res.status(401).json({
        errorMessage: 'Incorrect username or password',
      });

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET
    );
    res
      .cookie('token', token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    res.status(500).send();
  }
});

router.get('/logout', (req, res) => {
  res
    .cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

router.get('/user', (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.userId;
    res.json(verified.userId);
  } catch (err) {
    res.json(false);
  }
});

module.exports = router;
