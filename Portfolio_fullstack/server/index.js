const express = require("express");
const fs = require("fs").promises; // Using fs.promises for asynchronous file operations
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get('/projectdata', async (req, res) => {
    try {
        const data = require('./data/data.json');
        const projectsJson = data.projects;
        res.json(projectsJson);
    } catch (error) {
        console.error("Error fetching project data:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/updateprojects', async (req, res) => {
    try {
        const data = require('./data/data.json');
        const updatedProjects = req.body;

        // Validate updatedProjects data here if needed

        // Assign the updated projects array to the data object
        data.projects = updatedProjects;

        // Write the updated data object back to the JSON file asynchronously
        await fs.writeFile('./data/data.json', JSON.stringify(data, null, 2));
        
        res.status(200).json({ message: 'Project data updated successfully' });
    } catch (error) {
        console.error("Error updating project data:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(3005, () => {
    console.log("Server is running on port 3005");
});
