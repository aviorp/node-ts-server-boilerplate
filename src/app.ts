import express, {Request , Response,NextFunction} from 'express';
import apm from 'elastic-apm-node';
import dotenv from 'dotenv';
import routes from './routes/routes';
import authRoutes from './routes/authRoutes';
import { connectToMongo } from './db';
dotenv.config();
apm.start();
console.log(process.env)
const morgan = require('morgan');
const app = express();
const port = process.env.port || 3000;


app.use(express.json());
app.use(morgan('tiny'))
connectToMongo();
app.use(routes);
app.use('/auth' , authRoutes)
app.use((err:any , req:Request, res:Response, next:NextFunction) => {
    res.status(400).json({
        error: err.messages
    })
});

app.listen(port, () => console.log(`listening on port ${port}`));
