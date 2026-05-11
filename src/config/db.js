const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables.');
  }
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected:', MONGODB_URI);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};
