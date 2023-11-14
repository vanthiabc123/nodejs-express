const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  productId:{
    type: Schema.Types.ObjectId,
    ref: "Products",
  },
  content: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Comments", commentSchema);
