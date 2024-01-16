const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const port = 3000;

const secretKey = 'your-secret-key';

mongoose.connect('mongodb://localhost:27017/userDb', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a user schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

const usersData = [
  {
    "username": "user1",
    "password": "password1"
  },
  {
    "username": "user2",
    "password": "password2"
  }
];

// Insert the sample data into the "users" collection
// User.insertMany(usersData)
//   .then(() => {
//     console.log('Sample data inserted successfully');
//   })
//   .catch((error) => {
//     console.error('Error inserting sample data:', error);
//   })
//   .finally(() => {
//     // Close the connection after inserting data
//     // mongoose.connection.close();
//   });

  app.get('/users', async (req, res) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Internal Server Error');
    }
  });

const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];


// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
}


app.post('/login', (req, res) => {

  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if(!user) {
    return res.status(401).json({ message: 'Invalid crentials'});
  }

  const token = jwt.sign({userId: user.id, username: user.username}, secretKey, { expiresIn: '1h' });

  res.json({token});
})


app.get('/dashboard', isAuthenticated, (req, res) => {
  res.json({ message: 'Welcome to the dashboard', user: req.user });
});



let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: '1984', author: 'George Orwell' },
  ];

app.get('/', (req,res) => {
    res.send('hello parthau here');
})

app.get('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find((b) => b.id === id);
  
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
  
    res.json(book);
});

app.post('/books', (req, res) => {
    console.log(req.body, 'req')
    const { title, author } = req.body;
  
    if (!title || !author) {
      return res.status(400).json({ message: 'Title and author are required' });
    }
  
    const newBook = { id: books.length + 1, title, author };
    books.push(newBook);
  
    res.status(201).json(books);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})