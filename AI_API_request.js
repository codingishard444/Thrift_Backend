import express from "express";
import cors from "cors";
import fetch from "node-fetch"; 

const app = express();
const PORT = 3000;
const API_URL = "https://clever-preferably-bird.ngrok-free.app/generate";

app.use(express.json());
app.use(cors());

app.post("/generate-response", async (req, res) => {
    try {
        const { prompt } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }
        
        
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                user_message: prompt 
            }),
        });
        
        if (!response.ok) {
            throw new Error(`API returned status code ${response.status}`);
        }
        
        const data = await response.json();
        res.json({ response: data.response });
        
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Failed to process request" });
    }
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Forwarding requests to ${API_URL}`);
});