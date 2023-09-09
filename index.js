import express from 'express';
import config from './config.js';
import helmet from 'helmet';
import Parser from './utility/parser.js';
import Data from './utility/data.js';

const app = express();
app.use(helmet());

app.post('/data', async (req, res) => {
    try {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const parsedData = Parser.parseData(body);
            if (Object.keys(parsedData).length === 0) {
                console.log("Parsed data is empty, skipping insertion.");
                return res.status(200).send({ message: "Parsed data is empty." });
            }
            Data.insertData(parsedData);
            res.status(200).send({ message: "Data inserted successfully!" });
        });
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(200).send({ error: "Failed to insert data." });
    }
});

app.listen(config.server.port, () => {
    console.log(`Server listening on port ${config.server.port}`);
});

