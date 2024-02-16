const mongoose = require('mongoose');

// Connect to the MongoDB database at the specified URL
mongoose.connect("mongodb://127.0.0.1:27017/chat_app");

// Get a reference to the Mongoose connection
const db = mongoose.connection;

// Event handler for connection errors
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

// Event handler for successful connection
db.once('open', () => {
    console.log("Connected to DB : MongoDB")
});
// Export the database connection for use in other parts of the applicatio
module.exports = db;
