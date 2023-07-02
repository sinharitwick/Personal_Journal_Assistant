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

app.get('/', (req, res) => {
    res.send(`<h2> Personal Journal Assistant </h2>
    <p><b>ENDPOINTS:</b><p>
    <p><b>POST</b> /api/register</p>
    <p><b>POST</b> /api/login</p>
    <p><b>GET</b> /api/logout</p>
    <p><b>POST</b> /entry</p>
    <p><b>GET</b> /entry</p>
    <p><b>GET</b> /entry?startDate=[YYYY-MM-DD]&endDate=[YYYY-MM-DD]</p>
    <p><b>PUT</b> /entry/:id</p>
    <p><b>DELETE</b> /entry/:id</p>
    <p><b>POST</b> /prompt</p>`)
  })

connectToDatabase();

export default app;