import express from 'express';
import shows from './routes/shows.js';
import history from './routes/history.js';
import db from './services/db.js';

const app = express();
const port = 3000;

app.use(express.json());

db.connect();

app.use('/shows', shows);
app.use('/history', history);

app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});