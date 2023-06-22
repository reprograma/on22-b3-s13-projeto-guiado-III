const mongoose = require('mongoose');

const connect = async () => {
  try {
    const DATABASE_URI = process.env.DATABASE_URI;
    await mongoose.connect(DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

module.exports = { connect };
