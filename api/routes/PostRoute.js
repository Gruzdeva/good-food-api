const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json({posts});
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong'
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const {title, text, authorId} = req.body;

    if (!title && !text) {
      res.status(400).json({
        message: 'Bad input'
      });
    }

    const author = await User.findById(authorId);
    if (!author) {
      res.status(400).json({
        message: 'Author not found'
      });
    }

    const post = new Post({title, text, author: authorId});

    await post.save();

    res.status(201).json({
      message: 'Post created'
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong'
    });
  }
});


module.exports = router;
