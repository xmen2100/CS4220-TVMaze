import express from 'express';
import shows from './shows.js';
import history from './history.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/shows', shows);
app.use('/history', history);

app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});