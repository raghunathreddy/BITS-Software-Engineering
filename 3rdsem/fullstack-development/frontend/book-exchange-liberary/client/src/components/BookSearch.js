// Example Book Search Component (BookSearch.js)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookSearch() {
  //const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     const response = await axios.get('/api/books', { params: { searchQuery } });
  //     setBooks(response.data);
  //   };
  //   // fetchBooks();
  // }, [searchQuery]);
  const handleSearch = async (event) => {
    event.preventDefault();
    console.log(query)
    const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    console.log(data);
    setBooks(data.docs);
  };
  return (
    <div>
      <h2>book search</h2>
      <form onSubmit={handleSearch}>
        <div className="input-group mb-3">
          <input className='form-control'
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">Search</button>
          </div>
        </div>
      </form>
      <div className="container">
        <div className="row">
          {books.map(book => (<div key={book.key} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">Author: {book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>                 <p className="card-text"><small className="text-muted">First Published: {book.first_publish_year || 'N/A'}</small></p>               </div>
            </div>
          </div>))}
        </div>
      </div>

      {/* <div className="row">
          {books.map(book => (<div key={book.id} className="col-md-4 mb-4">
            <div className="card h-100"> <div className="card-body">
              <h5 className="card-title">{book.title}</h5>
              <p className="card-text">Author: {book.author}</p>
            </div>
            </div>
          </div>))}
        </div> */}
      {/* <div>
          {books.map((book) => (
            <div key={book._id}>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p>{book.genre}</p>
              <p>{book.condition}</p>
            </div>
          ))}
        </div> */}
    </div>
  );
}

export default BookSearch;
