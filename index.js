import express from 'express';
import config from './config.js';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import Parser from './utility/parser.js';
import Item from './utility/sqlize.js';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

app.post('/data', async (req, res) => {
    try {
        const parsedData = Parser.parseData(req.body);

        //console.log(parsedData);
        // filter if items are {}
        if (Object.keys(parsedData).length === 0) {
            console.log("Parsed data is empty, skipping insertion.");
            return res.status(200).send({ message: "Parsed data is empty." });
        }

        // Insert parsed data into the database
        const newItem = await Item.create({
            name: parsedData.name,
            label: parsedData.label,
            amount: parsedData.size || 0,  // Assuming `size` maps to `amount` in your table
            data: JSON.stringify(parsedData),  
        });

        //console.log("Data inserted:", newItem);
        
        res.status(201).send({ message: "Data inserted successfully!", item: newItem });
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(200).send({ error: "Failed to insert data." });
    }
});

app.listen(config.server.port, () => {
    console.log(`Server listening on port ${config.server.port}`);
});

