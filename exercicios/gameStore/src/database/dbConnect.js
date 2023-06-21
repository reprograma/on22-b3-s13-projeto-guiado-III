const DATABASE_URI = process.env.DATABASE_URI;
<<<<<<< HEAD
const mongoose = require('mongoose');

const connect = async () => {
    try {
        mongoose.connect(DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }),
        console.log("Connect database.")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {connect}
=======

const mongoose = require("mongoose");

const connect = async () => {
  try {
    mongoose.connect(DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  connect,
};
>>>>>>> f48729ef6538891d0b3f795fa14231b0a81fa4e4
