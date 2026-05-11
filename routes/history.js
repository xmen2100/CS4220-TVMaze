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
        const cursor = await db.find(
            'SearchHistoryKeyword',
            {},
            { projection: { _id: 0} }
        );

        const keywords = await cursor.toArray();

        return res.status(200).json(keywords);

    } catch (err) {
        return res.status(500).json({
            error: 'failed to retrieve keywords'
        });
    }
});

export default router;