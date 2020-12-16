const {Schema, model, Types} = require("mongoose");


const schema = new Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: Types.ObjectId,
    ref: "User"
  },
  post: {
    type: Types.ObjectId,
    ref: "Post"
  }
});


module.exports = model("Comment", schema);