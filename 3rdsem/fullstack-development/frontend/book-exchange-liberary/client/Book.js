const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  condition: { type: String, required: true },
  availability: { type: String, enum: ['available', 'unavailable'], default: 'available' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
