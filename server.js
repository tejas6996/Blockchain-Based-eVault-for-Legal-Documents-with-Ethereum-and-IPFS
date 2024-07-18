const express = require("express");
const Moralis = require("moralis").default;
const fs = require("fs");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/uploadToIpfs", async (req, res) => {
    const fileuploads = [
        {
            path: "lambo.png",
            content: fs.readFileSync("./lambo.png", { encoding: "base64" })
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
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:$8000`);
});
