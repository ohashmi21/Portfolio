const express = require("express");
const cors = require("cors");
const data = require('./data/data.json');
const app = express();

app.use(express.json());
app.use(cors());

app.get('/projectdata', (req, res) => {
    const projectsJson = data.projects; // Access projects directly from the imported object
    res.json(projectsJson); // Send the projects as JSON
});

app.listen(3005, () => {
    console.log("Server is running on port 3005");
});
