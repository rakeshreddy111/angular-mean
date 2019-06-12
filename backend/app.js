const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  // setting the headers to allows CORS (Cross Origin Resource Sharing)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: "fad2323",
      title: "First server-side post",
      content: "This is coming from server"
    },
    {
      id: "fad23123",
      title: "Second server-side post",
      content: "This is coming from server!!"
    }
  ];
  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  });
});

app.post("/api/posts", (req, res, next) => {
  const post = req.body; // .body is made available by body-parser
  console.log("post is " + post);
  res.statusCode(201).json({
    message: 'Post added successfully'
  });
});

module.exports = app;
