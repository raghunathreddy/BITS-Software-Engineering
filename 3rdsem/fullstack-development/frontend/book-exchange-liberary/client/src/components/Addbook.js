import React, { useState } from 'react';
import './Addbook.css'

function Addbook() {
  const [book, setBook] = useState({
    title: '',
    author: '',
    isbn: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:5203/api/Books/Add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });

      if (!response.ok) {
        throw new Error('Failed to add the book');
      }

      const result = await response.json();
      console.log('Book added successfully:', result);
      setSuccess(true);
      setBook({ title: '', author: '', genre: '',bookAvaliable: '',condition: '' }); // Reset form
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-book-container">
      <h2>Add New Book</h2>
      {success && <p style={{ color: 'green' }}>Book added successfully!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Book Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Genre">Genre:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={book.genre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="bookAvaliable">BookAvaliable:</label>
          <input
            type="text"
            id="bookAvaliable"
            name="bookAvaliable"
            value={book.bookAvaliable}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="condition">condition:</label>
          <input
            type="text"
            id="condition"
            name="condition"
            value={book.condition}
            onChange={handleChange}
            required
          />
        </div>
        <div>
         <button className="btn btn-primary" type="submit"  disabled={loading}>
          
            {loading ? 'Adding...' : 'Add Book'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Addbook;
