import express from "express";
import cors from "cors";
import { Client } from "@gradio/client";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Initialize Gradio Client
let client;

(async () => {
    client = await Client.connect("https://e12f6b739202a06c16.gradio.live"); // remember to change this frequently, after the link expires
    console.log("Connected to Gradio API");
})();

app.post("/generate-text", async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        // Send request to Gradio API
        const result = await client.predict("/predict", { 
            user_message: [prompt]  // Correct format
        });

        res.json({ response: result.data });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Failed to process request" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
