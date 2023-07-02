import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import { connectToDatabase } from './database.mjs';
import bodyParser from 'body-parser';
import journalController from './controllers/journalController.mjs'
import promptController from './controllers/promptController.mjs';
import userController from './controllers/userController.mjs';
import dotenv from 'dotenv'
dotenv.config();


app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/entry', journalController);
app.use('/prompt', promptController);
app.use('/api', userController);

connectToDatabase();

export default app;