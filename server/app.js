import express from 'express';
import cors from 'cors';
import routes from './src/routes/index.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.get('/api', (req, res) => {
    res.send('API is running');
});

export default app;