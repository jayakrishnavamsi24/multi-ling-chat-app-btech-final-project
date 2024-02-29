const express = require('express');
const cors = require('cors'); // Add CORS middleware

const {Translate} = require('@google-cloud/translate').v2;
require('dotenv').config();

const CREDENTIALS = require("./multi-lingual-415505-cfad90c7cffe.json");

const app = express();
const port = process.env.PORT || 3001;
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // For parsing JSON requests

// Configuration for the client
const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});

app.post('/translate', async (req, res) => {
    const { text, targetLanguage } = req.body;
    // console.log(text);
    // console.log(targetLanguage);
    // const text = "How are you";
    // const targetLanguage = 'it';
    try {
        const [translation] = await translate.translate(text, targetLanguage);
        res.json({ translation });
    } catch (error) {
        console.error("Translation Error:", error); 
        res.status(500).send('Error during translation');
    }
});

app.get('/', (req, res) => {
    res.send("It's working bro");
})

app.listen(port, () => {
    console.log(`Translation server listening on http://192.168.148.142:${port}/`);
});

