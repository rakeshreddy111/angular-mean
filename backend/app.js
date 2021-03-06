const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://rakeshreddy111:VZfEPVxQtpprTvR7@cluster0-tf8eh.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection failed!');
  })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  // setting the headers to allows CORS (Cross Origin Resource Sharing)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.get("/api/posts", (req, res, next) => {
  // this results all results from mongoDB
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched successfully',
        posts: documents
      });
    });
});


app.post("/api/posts", (req, res, next) => {
  // const post = req.body; // .body is made available by body-parser
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  // mongoose will automatically create a write query
  post.save().then(createdPost => {
    res.statusCode(201).json({
      message: 'Post added',
      postId: createdPost._id
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id})
    .then(result => {
      console.log(result);
      res.status(200).json({ message: 'Post Deleted!!' });
    })
});

module.exports = app;
