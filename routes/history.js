import express from 'express'
import db from '../services/db.js';

const router = express.Router();

router.get('/', async(req, res) => {
    const {type} = req.query;
    
    if (type == undefined) {
        return res
            .status(400)
            .json({ error: 'type query parameter is required' });
    }

    if (type !== 'keywords') {
        return res
            .status(400)
            .json({ error: 'type must be a keyword' });
    }

    try {
        const cursor = await db.find('SearchHistoryKeyword');

        const keywords = await cursor.toArray();

        const cleanKeywords = keywords.map((entry) => {
            return {
                keyword: entry.keyword
            };
        });

        return res.status(200).json(cleanKeywords);

    } catch (err) {
        return res.status(500).json({
            error: 'failed to retrieve keywords'
        });
    }
});

export default router;