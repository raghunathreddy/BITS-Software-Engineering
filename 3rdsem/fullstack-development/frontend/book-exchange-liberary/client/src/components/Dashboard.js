// src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Menu from './menu';
import { useAuth } from './AuthContext';
function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, logout } = useAuth();
    const goToNewbook = () => {
        navigate('/addbook'); // Navigate to the new screen when button is clicked
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const userid = user.user_id; // queryParams.get('user_id');
        // Assuming the API returns a list of books
        const fetchbooks = async () => {
            try {
                const response = await fetch(`http://localhost:5203/api/Books/Getuser?user_id=${userid}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json', // Accept JSON response
                        'Content-Type': 'application/json', // Specify content type (even if empty body, it's a good practice)
                    },
                    body: JSON.stringify({})
                }); 

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
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div style={{ display: 'flex' }}>
            {/* Sidebar (Menu) */}
            <Menu />

            <div style={{ marginLeft: '220px', padding: '20px', flex: 1 }}>
                <h1>My Books collection</h1>
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
            </div>
            <div className="input-group-append">

                <button className="btn btn-primary" type="submit" onClick={goToNewbook} >Add_NewBook</button>
            </div>
        </div>
    );
}

export default Dashboard;
