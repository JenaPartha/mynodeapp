const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./database');
const userRoutes = require('./user.routes');

const app = express();
const port = 3000;

// Use body-parser middleware to parse JSON data
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Use user routes
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
