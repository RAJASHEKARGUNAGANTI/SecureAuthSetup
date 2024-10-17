const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
dotenv.config();
// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',  // Your frontend URL
  credentials: true,  // Enable credentials (cookies, authorization headers)
}));

app.use(cookieParser());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't match one above, send back index.html.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/'));
});

// Routes
app.use('/api/auth', authRoutes); 
app.use('/api', userRoutes); 

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
