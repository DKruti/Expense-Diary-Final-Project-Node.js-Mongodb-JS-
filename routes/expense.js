import express from 'express';
import { ObjectId } from 'mongodb';
import { getLoggerInstance } from '../logger.js';
import { getDatabaseClient } from '../database.js';
import path from 'path';
import { fileURLToPath } from 'url';
export const expense = express.Router();

const logger = getLoggerInstance();

// Endpoint to get all Expenses
expense.get('/', async (req, res) => {
  try {
    const mydbInfo = getDatabaseClient();
    const collection = await mydbInfo.collection('expenses').find().toArray();
    console.log(collection, 'collections');
    res.send(collection);
  } catch (err) {
    logger.error(`{"error":${err}}`);
    res.send(`{"error":${err}}`);
  }
});


expense.get('/list', async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    console.log(__dirname);
    res.sendFile(path.join(__dirname, '../public/listExpenses.html'));
  } catch (err) {
    logger.error(`{"error":${err}}`);
    res.send(`{"error":${err}}`);
  }
});

// report1
expense.get('/monthlyReport', async (req, res) => {
  try {
    const mydbInfo = getDatabaseClient();
    const result = await mydbInfo.collection('expenses').aggregate([      
      {
        $group : 
        { 
          _id: {  year: { $year: "$date"}, month: { $month: "$date"} },
          totalAmount: { $sum: "$amount"}
        }
      }
    ]).toArray();    
    console.log('report', result);
    res.send(result);
  } catch (err) {
    logger.error(`{"error":${err}}`);
    res.send(`{"error":${err}}`);
  }
});


expense.get('/report', async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    console.log(__dirname);
    res.sendFile(path.join(__dirname, '../public/report.html'));
  } catch (err) {
    logger.error(`{"error":${err}}`);
    res.send(`{"error":${err}}`);
  }
});



expense.get('/add', async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    console.log(__dirname);
    res.sendFile(path.join(__dirname, '../public/addExpense.html'));
  } catch (err) {
    logger.error(`{"error":${err}}`);
    res.send(`{"error":${err}}`);
  }
});

expense.get('/update', async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    console.log(__dirname);
    res.sendFile(path.join(__dirname, '../public/updateExpense.html'), {title: 'new title'});
  } catch (err) {
    logger.error(`{"error":${err}}`);
    res.send(`{"error":${err}}`);
  }
});

expense.put('/update-expense', async (req, res) => {
  try {
    const { id, title, amount } = req.body;
    const mydbInfo = getDatabaseClient();
    const filter = { "_id" : new ObjectId(id) };
    /* Set the upsert option to insert a document if no documents match the filter */
    const options = { upsert: true };        
    const updateDoc = {
      $set: {
        title: title,
        amount: Number(amount)
      }
    };    
    // Update the first document that matches the filter
     const result = await  mydbInfo.collection('expenses').updateOne(filter, updateDoc, options);
     console.log(result);
     res.send(result);
  } catch (err) {
    logger.error(`{"error":${err}}`);
    res.send(`{"error":${err}}`);
  }
});

expense.delete('/delete/:id', async (req, res) => {
  try {    
    const id = req.params.id;
    console.log(id);
    const mydbInfo = getDatabaseClient();   
    const query = { "_id" : new ObjectId(id) };       
    const result = await mydbInfo.collection('expenses').deleteOne(query);
    console.log(result);
    res.send(result);

  } catch (err) {
    logger.error(`{"error":${err}}`);
    res.send(`{"error":${err}}`);
  }
});


// Endpoint to add a new expense
expense.post('/add-Expense', async (req, res) => {
  const { title, amount } = req.body;

  try {
    const mydbInfo = getDatabaseClient();

    // Add the new expense to the 'expenses' collection
    const doc = {
      title: title,
      amount: amount,
      date: new Date(Date.now())
    }
    await mydbInfo.collection('expenses').insertOne(doc);

    res.status(200).send('expense added successfully');
  } catch (err) {
    logger.error(`{"error":${err}}`);
    res.status(500).send('Error adding expense');
  }
});


