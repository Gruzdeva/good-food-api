const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');


const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({users});
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong'
    });
  }
});

router.post('/register', async (req, res) => {
  try {
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        message: 'Inccorect data passed'
      });
    }

    const emailCandidate = await User.findOne({email});
    if (emailCandidate) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    const usernameCandidate = await User.findOne({username});
    if (usernameCandidate) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({username, email, password: hashedPassword});

    await user.save();

    res.status(201).json({
      message: 'User created'
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong'
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({message: 'User not found'});
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({message: 'Incorrect password'});
    }
    
    res.json({user});
  }
  catch (e) {
    res.status(500).json({
      message: 'Something went wrong'
    });
  }
});


module.exports = router;
