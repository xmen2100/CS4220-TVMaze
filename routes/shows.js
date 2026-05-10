import express from 'express';

import { searchShows, getShowById } from '../services/api.js';
import db from '../services/db.js';

const router = express.Router();

// helper function for formatting minimal JSON response
const _formatShows = (results) => {
    return results.map((result) => {
        return {
            display: `${result.show.name} (${result.show.premiered ? result.show.premiered.slice(0, 4) : 'N/A'})`,
            identifier: result.show.id
        };
    });
};

// ex: localhost:8888/shows?keyword=pokemon
router.get('/', async (req, res) => {
    try {
        const { query } = req;
        const keyword = query.keyword;

        if (!keyword) {
            return res
                .status(400)
                .json({ error: 'keyword query parameter is required' });
        }

        // search tvmaze api by keyword
        const results = await searchShows(keyword);

        // save keyword into mongo only if unique
        const cursor = await db.find('SearchHistoryKeyword', { keyword });
        const existingKeyword = await cursor.next();

        if (!existingKeyword) {
            await db.insert('SearchHistoryKeyword', { keyword });
        }
        // format results for minimal clean JSON response
        const shows = _formatShows(results);

        // return minimal results
        res.json(shows);
    } catch (error) {
        // handle unexpected errors
        res.status(500).json({ error });
    }
});

// ex: localhost:3000/shows/590
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res
                .status(400)
                .json({ error: 'show id path parameter is required' });
        }

        const show = await getShowById(id);

        if (!show) {
            return res
                .status(404)
                .json({ error: 'show not found' });
        }

        res.json(show);

    } catch (error) {
        res.status(500).json({
            error: 'There was an error getting show details'
        });
    }
});

export default router;
