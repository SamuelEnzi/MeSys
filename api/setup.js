import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

router.get('/code', async (req, res, next) => {
    try {
        const filePath = path.join(__dirname, '..', 'server.lua');
        const content = await fs.readFile(filePath, 'utf8');
        res.send(content);
    } catch (error) {
        next(error);
    }
});

export default router;