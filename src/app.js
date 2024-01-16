const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const userRoutes = require('./routes/user.routes');
const cors = require('cors');

const app = express();
const port = 3001;

// Use body-parser middleware to parse JSON data
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your specific domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow sending cookies
}));

// Connect to MongoDB
connectDB();

// Use user routes
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
