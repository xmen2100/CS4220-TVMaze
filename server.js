import express from 'express';
import shows from './routes/shows.js';
import history from './routes/history.js';
import db from './services/db.js';

const app = express();
app.set('json spaces', 2);
const port = 3000;

app.use(express.json());

app.use('/shows', shows);
app.use('/history', history);

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// start server and connect to MongoDB
app.listen(port, async () => {
    try {
        await db.connect();
        console.log('Connected to MongoDB');
        console.log(`Server is running on http://localhost:${port}`);
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
});
