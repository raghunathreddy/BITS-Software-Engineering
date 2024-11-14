const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all origins (use specific origins in production)
app.use(cors({
  origin: '*',  // '*' allows all origins, change it to 'http://localhost:3000' for tighter security
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

app.listen(5203, () => {
    console.log('Server running on http://localhost:5203');
  });