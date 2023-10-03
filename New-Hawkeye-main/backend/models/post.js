const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true }
});
postSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Post", postSchema);
