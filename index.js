import express from 'express';
import config from './config.js';
import bodyParser from 'body-parser';
import data from './api/data.js';
import statistics from './api/statistics.js';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

app.use(helmet({
    contentSecurityPolicy: false,
    frameguard: false
}));

app.use(cors());
app.use(data);
app.use(bodyParser.json());
app.use("/v1/statistics/",statistics);

app.listen(config.server.port, () => {
    console.log(`Server listening on port ${config.server.port}`);
});