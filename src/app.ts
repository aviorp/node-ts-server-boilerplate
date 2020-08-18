import express, {Request , Response,NextFunction} from 'express';
import routes from './routes/routes';
import authRoutes from './routes/authRoutes';
import { connectToMongo } from './db';
const app = express();
const port = process.env.port || 3000;

app.use(express.json());
connectToMongo();
app.use(routes);
app.use('/auth' , authRoutes)
app.use((err:any , req:Request, res:Response, next:NextFunction) => {
    res.status(400).json({
        error: err.messages
    })
});

app.listen(port, () => console.log(`listening on port ${port}`));
