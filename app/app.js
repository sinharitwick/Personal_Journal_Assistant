const express = require('express');
const app = express();
const db = require('./database');
const bodyParser = require('body-parser');
const journalController = require('./controllers/journalController');
const promptController = require('./controllers/promptController');
const dotenv = require('dotenv');
dotenv.config();


app.use(express.json());
app.use(bodyParser.json());

app.use('/entry', journalController);
app.use('/prompt', promptController);

db.connectToDatabase();

module.exports = app;