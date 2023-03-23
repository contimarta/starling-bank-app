import express from 'express';
import bodyParser from 'body-parser';
import BankDataServices from '../utils/bankDataServices.js';

const PORT = 4000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});

const bankData = new BankDataServices();


app.get('/account', async (req, res) => {
    try{
        const accountUid = await bankData.getAccountUid();
        res.status(200).json(accountUid);
    }catch(e){
	 res.status(422).json({ error: e.message });}

	
});

app.get('/statement', async (req, res) => {
    try{

        const {accountUid} = req.query;
        console.log(accountUid);
        const statement = await bankData.getAccountStatementAsync(accountUid);
        res.status(200).json(statement);
    }catch(e){
	 res.status(422).json({ error: e.message });}

	
});


app.get('/savings-goals', async (req, res) => {
    try{
        const {accountUid} = req.query;
        const savingsGoals = await bankData.getAllSavingsGoalsAsync(accountUid);
        res.status(200).json(savingsGoals);
    }catch(e){
	 res.status(422).json({ error: e.message });}

	
});

app.post('/savings-goals/new-goal', async (req, res) => {
    try{
        const {accountUid, name,target  } = req.query;
        const newSavingsGoal = await bankData.createSavingsGoalAsync(accountUid,name,target);
        res.status(200).json(newSavingsGoal);
    }catch(err){
	 res.status(422).json(err);}

	
});

app.post('/savings-goals/add-money', async (req, res) => {
    try{
        const {name,amount  } = req.body;
        const transactionSavingsGoal = await bankData.transferToSavingsGoalAsync(name,amount);
        res.status(200).json(transactionSavingsGoal);
    }catch(e){
	 res.status(422).json({ error: e.message });}

	
});

const server = app.listen(PORT, () => {
    const SERVERHOST = server.address().address;
    const SERVERPORT = server.address().port;

    console.log(`App is listening at: http://${SERVERHOST}:${SERVERPORT}`);
});

export default app;