import https from 'https';
import fs from 'fs';
import express from 'express';
import * as dotenv from 'dotenv';
import {startup} from './routes/startup.js';
import {expense} from './routes/expense.js';
import{getLoggerInstance} from './logger.js'
import {connectToDatabase } from './database.js';

const app = express();
dotenv.config()

const logger = getLoggerInstance();

connectToDatabase();//databse call from database.js file

const httpsOptions={
    key:fs.readFileSync('./key.pem'),
    cert:fs.readFileSync('./cert.pem'),
};

app.use(express.static('public'));

app.use(express.json())
app.use('/',startup)
app.use('/expense',expense)


const server = https.createServer(httpsOptions,app);

app.get('/', (req, res) => {
    // console.log('kruti');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(8080,()=>{
    logger.info(`server listening on port 8080, Type command Ctrl + C to kill the server`)
})