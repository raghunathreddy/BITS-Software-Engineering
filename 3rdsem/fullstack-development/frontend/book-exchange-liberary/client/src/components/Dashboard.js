// src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import './Dashboard.css';

import { useNavigate } from 'react-router-dom';

function Dashboard() {

    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const goToNewbook = () => {
        navigate('/addbook'); // Navigate to the new screen when button is clicked
      };
    // Fetch data from an API
    useEffect(() => {
        // Assuming the API returns a list of users
        const fetchbooks = async () => {
            try {
                const response = await fetch('http://localhost:5203/api/Books/Getuser?user_id=1', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json', // Accept JSON response
                        'Content-Type': 'application/json', // Specify content type (even if empty body, it's a good practice)
                      },
                      body: JSON.stringify({})
                      //mode: 'no-cors',
                }); // Replace with your actual API URL

                 if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                console.log(data);
                setBooks(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchbooks();
    }, []);  // Empty dependency array ensures this runs once on component mount

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
      
        <><div className="table-container">
            <h1>Your Books collection</h1>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Book_ID</th>
                        <th>Book Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>BookAvaliable</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(Book => (
                        <tr key={Book.book_id}>
                            <td>{Book.book_id}</td>
                            <td>{Book.title}</td>
                            <td>{Book.author}</td>
                            <td>{Book.genre}</td>
                            <td>{Book.bookAvaliable}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div><div className="input-group-append">
        
                <button className="btn btn-primary" type="submit" onClick={goToNewbook} >Add_NewBook</button>
            </div></>

    );
}

export default Dashboard;
