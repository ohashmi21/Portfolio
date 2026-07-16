const express = require("express");
const fs = require("fs").promises;
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = 3005;
const DATA_PATH = path.join(__dirname, "data", "data.json");
const PUBLIC_DIR = path.join(__dirname, "public");
const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

app.use(express.json());
app.use(cors());
app.use("/public", express.static(PUBLIC_DIR));

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, PUBLIC_DIR);
    },
    filename: (req, file, callback) => {
        const originalExt = path.extname(file.originalname).toLowerCase();
        const safeBaseName = path
            .parse(file.originalname)
            .name.replace(/[^a-zA-Z0-9-_]/g, "-")
            .slice(0, 80) || "project-image";
        callback(null, `${Date.now()}-${safeBaseName}${originalExt}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, callback) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ALLOWED_MIME_TYPES.has(file.mimetype) && ALLOWED_EXTENSIONS.has(ext)) {
            callback(null, true);
            return;
        }
        callback(new Error("Only image files (.jpg, .jpeg, .png, .webp, .gif) are allowed."));
    }
});

async function ensureStorageDirectory() {
    await fs.mkdir(PUBLIC_DIR, { recursive: true });
}

async function readDataFile() {
    const rawData = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(rawData);
}

async function writeDataFile(data) {
    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2));
}

function isSafeFilename(fileName) {
    if (typeof fileName !== "string") {
        return false;
    }

    const trimmed = fileName.trim();
    return trimmed.length > 0 && path.basename(trimmed) === trimmed;
}

function validateProjectPayload(projects) {
    if (!Array.isArray(projects)) {
        return "Projects payload must be an array.";
    }

    const invalidImages = projects.find((project) => {
        return !Array.isArray(project?.Images) || project.Images.length === 0
            || !project.Images.every(isSafeFilename);
    });
    if (invalidImages) {
        return "Each project must include at least one valid image filename.";
    }

    return null;
}

app.get("/projectdata", async (req, res) => {
    try {
        const data = await readDataFile();
        res.json(data.projects);
    } catch (error) {
        console.error("Error fetching project data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/experiencedata", async (req, res) => {
    try {
        const data = await readDataFile();
        res.json(data.experience);
    } catch (error) {
        console.error("Error fetching experience data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/updateexperience", async (req, res) => {
    try {
        const data = await readDataFile();
        data.experience = req.body;
        await writeDataFile(data);
        res.status(200).json({ message: "Experience data updated successfully" });
    } catch (error) {
        console.error("Error updating experience data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/volunteerdata", async (req, res) => {
    try {
        const data = await readDataFile();
        res.json(data.volunteer);
    } catch (error) {
        console.error("Error fetching volunteer data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/updatevolunteer", async (req, res) => {
    try {
        const data = await readDataFile();
        data.volunteer = req.body;
        await writeDataFile(data);
        res.status(200).json({ message: "Volunteer data updated successfully" });
    } catch (error) {
        console.error("Error updating volunteer data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/uploadprojectimage", (req, res) => {
    upload.single("image")(req, res, (error) => {
        if (error) {
            const errorMessage = error instanceof multer.MulterError
                ? error.message
                : error.message || "Image upload failed.";
            res.status(400).json({ error: errorMessage });
            return;
        }

        if (!req.file?.filename) {
            res.status(400).json({ error: "Image file is required." });
            return;
        }

        res.status(200).json({
            fileName: req.file.filename,
            url: `/public/${req.file.filename}`
        });
    });
});

app.delete("/projectimage/:filename", async (req, res) => {
    try {
        const fileName = req.params.filename;
        if (!isSafeFilename(fileName)) {
            res.status(400).json({ error: "Invalid filename." });
            return;
        }

        const filePath = path.join(PUBLIC_DIR, fileName);
        await fs.unlink(filePath);
        res.status(200).json({ message: "Image deleted successfully." });
    } catch (error) {
        if (error.code === "ENOENT") {
            res.status(404).json({ error: "Image file not found." });
            return;
        }

        console.error("Error deleting project image:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/updateprojects", async (req, res) => {
    try {
        const updatedProjects = req.body;
        const validationError = validateProjectPayload(updatedProjects);
        if (validationError) {
            res.status(400).json({ error: validationError });
            return;
        }

        const data = await readDataFile();
        data.projects = updatedProjects;
        await writeDataFile(data);
        res.status(200).json({ message: "Project data updated successfully" });
    } catch (error) {
        console.error("Error updating project data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

ensureStorageDirectory()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to initialize server storage:", error);
        process.exit(1);
    });
