import express from 'express';
import config from './config.js';
import bodyParser from 'body-parser';
import data from './api/data.js';
import statistics from './api/statistics.js';
import setup from './api/setup.js';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

app.use(helmet({
    contentSecurityPolicy: false,
    frameguard: false
}));

app.use(cors());
app.use("/v1/data/",data);
app.use(bodyParser.json());
app.use("/v1/statistics/",statistics);
app.use("/v1/setup/",setup);

app.listen(config.server.port, () => {
    console.log(`Server listening on port ${config.server.port}`);
});