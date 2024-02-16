const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("Jai shree ram")
})


// Start the server and listen for incoming connections on the specified port
app.listen(port, (err) => {
    if (err) {
        console.log("Error in running server ", err)
    }
    console.log(`Server is running on http://localhost:${port}`)
})