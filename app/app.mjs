import express from 'express';
const app = express();
import { connectToDatabase } from './database.mjs';
import bodyParser from 'body-parser';
import journalController from './controllers/journalController.mjs'
import promptController from './controllers/promptController.mjs';
import dotenv from 'dotenv'
dotenv.config();


app.use(express.json());
app.use(bodyParser.json());

app.use('/entry', journalController);
app.use('/prompt', promptController);

connectToDatabase();

export default app;