// post model using mongoose

const mongoose = require('mongoose');

//Schema is just a blueprint
const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

// We need to turn the above definition to model
module.exports = mongoose.model('Post', postSchema);  // collection name in database will be posts
