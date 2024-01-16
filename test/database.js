const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.connect('mongodb://localhost:27017/userDb', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDb', error);
    }
}

module.exports = connectDB;