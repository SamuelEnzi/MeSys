import { Router } from 'express';
import Parser from '../utility/parser.js';
import Data from '../utility/data.js';

const router = Router();

router.post('/items', async (req, res) => {
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
            Data.insertItems(parsedData);
            res.status(200).send({ message: "Data inserted successfully!" });
        });
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(200).send({ error: "Failed to insert data." });
    }
});

router.post('/fluids', async (req, res) => {
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
            Data.insertFluid(parsedData);
            res.status(200).send({ message: "Data inserted successfully!" });
        });
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(200).send({ error: "Failed to insert data." });
    }
});

router.post('/energy', async (req, res) => {
    try {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const parsedData = Parser.parseData(body)[0];
            if (Object.keys(parsedData).length === 0) {
                console.log("Parsed data is empty, skipping insertion.");
                return res.status(200).send({ message: "Parsed data is empty." });
            }
            Data.insertEnergy(parsedData);
            res.status(200).send({ message: "Data inserted successfully!" });
        });
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(200).send({ error: "Failed to insert data." });
    }
});

export default router;