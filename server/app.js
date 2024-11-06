import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/healthCheck', (req, res) => {
    res.send('API is running');
});

export default app;