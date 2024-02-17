const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const db = require('./config/mongoose');
// const User = require('./models/User');
const userRoute = require("./routes/userRoutes")
require('dotenv').config();

app.use(express.json());

app.use("/", require('./routes'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.get("/", (req, res) => {
//     res.send("Jai shree ram")
// })


// Start the server and listen for incoming connections on the specified port
app.listen(port, (err) => {
    if (err) {
        console.log("Error in running server ", err)
    }
    console.log(`Server is running on http://localhost:${port}`)
})