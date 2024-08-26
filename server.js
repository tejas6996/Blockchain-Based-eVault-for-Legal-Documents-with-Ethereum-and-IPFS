const express = require("express");
const Moralis = require("moralis").default;
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();
const path = require("path");

const app = express();
const port = 3000;

const upload = multer({ dest: "uploads/" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Check if index.html exists
const indexPath = path.join(__dirname, 'public', 'index.html');
if (!fs.existsSync(indexPath)) {
    console.error(`index.html not found at ${indexPath}`);
    process.exit(1); // Exit the process with an error code
}

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(indexPath);
});

app.post("/uploadToIpfs", upload.single("file"), async (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).send("No file uploaded.");
    }

    const filePath = file.path;
    const fileContent = fs.readFileSync(filePath, { encoding: "base64" });

    const fileuploads = [
        {
            path: file.originalname,
            content: fileContent
        }
    ];

    try {
        await Moralis.start({
            apiKey: process.env.MORALIS_KEY
        });

        const response = await Moralis.EvmApi.ipfs.uploadFolder({
            abi: fileuploads
        });

        res.json(response.result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error uploading to IPFS");
    } finally {
        fs.unlinkSync(filePath); // Clean up the uploaded file
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
