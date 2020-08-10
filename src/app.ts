import express from 'express';
import routes from './routes/routes';
import { connectToMongo } from './db/db';
const app = express();
const port = process.env.port || 5000;

app.use(express.json());
connectToMongo();
app.use(routes);
app.use((err: any | null, req?: any | null, res?: any | null, next?: Function) => {
    res.status(400).json({
        error: err.messages
    })
});

app.listen(port, () => console.log(`listening on port ${port}`));
