const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const port = 8080;
const mongoURI = 'mongodb+srv://admin:admin@cluster0.e2wav.mongodb.net/good-food?retryWrites=true&w=majority';


app.use(express.json({extended: true}));
app.use(cors());

app.use('/api/user', require('./routes/UserRoute'));
app.use('/api/post', require('./routes/PostRoute'));
app.use('/api/comment', require('./routes/CommentRoute'));


const start = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    app.listen(port, () => {
      console.log(`App has been started on port ${port}...`);
      console.log('---');
      console.log('GET /api/user/          | for get all users');
      console.log('POST /api/user/register | for register new user');
      console.log('POST /api/user/login    | for login new user');
      console.log('---');
      console.log('GET  /api/post          | for get all posts');
      console.log('POST /api/post          | for create post');
      console.log('---');
      console.log('GET  /api/comment       | for get all comments');
      console.log('POST /api/comment       | for create comment');
    });
  } catch (e) {
    console.log('Server Error:', e.message);
    process.exit(1);
  }
}

start();
