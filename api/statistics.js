import { Router } from 'express';
import database from '../utility/database.js';

const router = Router();

router.get('/itemcount', async (req, res, next) => {
    try {
        const statistics = await database.totalItemCount();
        res.status(200).json(statistics);
    } catch (error) {
        next(error);
    }
});

router.get('/daily', async (req, res, next) => {
    try {
        const statistics = await database.fetchDailyItemCount();
        res.status(200).json(statistics);
    } catch (error) {
        next(error);
    }
});

router.get('/uranium', async (req, res, next) => {
    try {
        const statistics = await database.uraniumTrend();
        res.status(200).json(statistics);
    } catch (error) {
        next(error);
    }
});

router.get('/top', async (req, res, next) => {
    try {
        const statistics = await database.topItems();
        res.status(200).json(statistics);
    } catch (error) {
        next(error);
    }
});

export default router;