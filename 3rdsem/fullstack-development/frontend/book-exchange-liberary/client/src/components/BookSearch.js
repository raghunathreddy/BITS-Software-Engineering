// Example Book Search Component (BookSearch.js)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Menu from './menu';

function BookSearch() {
  //const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
   useEffect(() => {
  const fetchBooks = async () => {
    const response = await fetch(`http://localhost:5203/api/BookExchange/GetExchangeBookdetails`);
    const data = await response.json();
    console.log(data);
    setBooks(data);
    };
   fetchBooks();
   }, [searchQuery]);

  return (
    
    <div style={{ display: 'flex' }}>
      {/* Sidebar (Menu) */}
      <Menu />

      <div style={{ marginLeft: '220px', padding: '20px', flex: 1 }}>
        <h1>Books Avaliable for Exchange</h1>
        <table className="user-table">
          <thead>
            <tr>
              <th>Book_ID</th>
              <th>Book_Owner</th>
              <th>Title</th>
              <th>Book_exchanged_To</th>
              <th>Requested_status</th>
              <th>Request_message</th>
              <th>delivery_method</th>
              <th>Exchange_date</th>
             
            </tr>
          </thead>
          <tbody>
            {books.map(Book => (
              <tr key={Book.exchange_id}>
                <td>{Book.book_id}</td>
                <td>{Book.book_Owner}</td>
                <td>{Book.title}</td>
                <td>{Book.book_exchanged_To}</td>
                <td>{Book.requested_status}</td>
                <td>{Book.request_message}</td>
                <td>{Book.delivery_method}</td>
                <td>{Book.exchange_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      );
}

      export default BookSearch;
