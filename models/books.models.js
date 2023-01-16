const mongoose = require("mongoose");

const booksDataSchema = mongoose.Schema({
  title: String,
  genre: String,
  price: Number,
  author: String,
  username: Number
});

const BooksDataModel = mongoose.model("booksdatacollection", booksDataSchema);

module.exports = BooksDataModel;
