const mongoose = require('mongoose');
require('dotenv').config();

const ConnectDB = async () => {
    // console.log('hhhhhhhhhhhh')
  try {
    await mongoose.connect("mongodb+srv://arvind:1qigH5rehgYiZHRu@cluster0.0zoqnty.mongodb.net/ThinkDebugTask");
    
    console.log('Database Connected');

  } catch (error) {
    console.error('Database Connection Failed:', error);
    process.exit(1); // Stop the server if DB connection fails
  }
};

module.exports = { ConnectDB };
