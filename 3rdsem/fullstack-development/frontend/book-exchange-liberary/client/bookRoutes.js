const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

// Create Book Listing Route
router.post('/books', async (req, res) => {
  const { title, author, genre, condition, availability, userId } = req.body;

  const newBook = new Book({ title, author, genre, condition, availability, userId });
  await newBook.save();

  res.status(201).json(newBook);
});

// Get All Books Route (searchable)
router.get('/books', async (req, res) => {
  const { searchQuery, genre, location } = req.query;

  const books = await Book.find({
    $or: [
      { title: new RegExp(searchQuery, 'i') },
      { author: new RegExp(searchQuery, 'i') },
      { genre: genre },
      { location: location },
    ],
  });

  res.json(books);
});

module.exports = router;
