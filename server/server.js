import express from 'express';
import bodyParser from 'body-parser';
import BankDataServices from './serverUtils/bankDataServices.js';
import cors from "cors"

/* This Middleman Server is designed and implemented to avoid Cross-Origin Resource Sharing (CORS) errors when sending API requests 
from my React frontend to the Starling Bank API. Instead of sending requests directly to the Starling Bank API, 
the frontend sends requests to this Middleman Server, which in turn sends the requests to the Starling Bank API. 
The responses are then sent back to the frontend via the Middleman Server.
 */

const PORT = 4000;

const app = express();

// Middleware to parse incoming JSON payloads
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//This allows CORS requests to my middleman server
app.use(cors())

//The bankData object is an instance of the class BankDataServices. It contains several methods that make requests to Starling Bank API
const bankData = new BankDataServices();

//When a get request is made to /account in the middleman server, the getAccountUid method is called on the bankData object
app.get('/account', async (req, res) => {
    try{
        const accountUid = await bankData.getAccountUid();
        res.status(200).json(accountUid);
    }catch(e){
	 res.status(422).json({ error: e.message });}
	
});

//When a get request is made to /statement in the middleman server, the getAccountStatementAsync method is called on the bankData object
app.get('/statement', async (req, res) => {
    try{

        const {accountUid} = req.query;
        const statement = await bankData.getAccountStatementAsync(accountUid);
        res.status(200).json(statement);
    }catch(e){
	 res.status(422).json({ error: e.message });}
	
});

//When a get request is made to /savings-goals in the middleman server, the getAllSavingsGoalsAsync method is called on the bankData object
app.get('/savings-goals', async (req, res) => {
    try{
        const {accountUid} = req.query;
        const savingsGoals = await bankData.getAllSavingsGoalsAsync(accountUid);
        res.status(200).json(savingsGoals);
    }catch(e){
	 res.status(422).json({ error: e.message });}

	
});

//When a post request is made to /savings-goals/new-goal in the middleman server, the createSavingsGoalAsync method is called on the bankData object
app.post('/savings-goals/new-goal', async (req, res) => {
    try{
        const {accountUid, name,target  } = req.body;
        const newSavingsGoal = await bankData.createSavingsGoalAsync(accountUid,name,target);
        res.status(200).json(newSavingsGoal);
    }catch(err){
	 res.status(422).json(err);}

	
});

//When a post request is made to /savings-goals/add-money in the middleman server, the transferToSavingsGoalAsync method is called on the bankData object
app.post('/savings-goals/add-money', async (req, res) => {
    try{
        const {accountUid, savingsGoal, amount  } = req.body;
        

        const transactionSavingsGoal = await bankData.transferToSavingsGoalAsync(accountUid, savingsGoal,amount);
        res.status(200).json(transactionSavingsGoal);
    }catch(e){
	 res.status(422).json({ error: e.message });}

	
});

//Starts a server listening on a specified port PORT using the app instance. 
const server = app.listen(PORT, () => {
    const SERVERHOST = server.address().address;
    const SERVERPORT = server.address().port;

    console.log(`App is listening at: http://${SERVERHOST}:${SERVERPORT}`);
});

export default app;