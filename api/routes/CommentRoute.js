const express = require('express');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');


const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find();

    res.status(200).json({comments});
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong'
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const {text, postId, authorId} = req.body;

    if (!text) {
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

    const post = await Post.findById(postId);
    if (!post) {
      res.status(400).json({
        message: 'Post not found'
      });
    }

    const comment = new Comment({text, author: authorId, post: postId});
    await comment.save();

    res.status(201).json({
      message: 'Comment created'
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong'
    });
  }
});


module.exports = router;
