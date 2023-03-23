import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Main from './components/Main/Main.jsx';
import Savings from './components/Savings/Savings.jsx';
import { getAccount, getStatement,getSavingsGoals } from './utils/proxyDataServices.js';
import {roundup} from "./utils/roundup.js"
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { useEffect, useState } from "react";
import './App.css';



function App() {
//Variables and their setters, some of them will be passed to components as props
  const [statement, setStatement] = useState([]);
  const [savingsGoals, setSavingsGoals] = useState([]);
  const [savingsGoalsError, setSavingsGoalsError] = useState({});
  const [error, setError] = useState({});
  const [account, setAccount] = useState({})
  const [roundupToSavings, setRoundupToSavings] = useState(0)

//Function that sets the account (only the first account of a given user)
    const findAccount = async()=>{
    setAccount (await getAccount())
    }
//Function that sets the statement of the account (already formatted), or an error if there is a problem with the request
  const uploadStatement = async () => {
    const account = await getAccount();
    const data = await getStatement(account.accountUid);
    
    if (!data?.error){
      setStatement(data);
      setError({});

    }
    if(data?.error){
      setError(data);
      setStatement([]);
    
    }}

  //Function that sets the savings goals of the account, or an error if there is a problem with the request
  const uploadSavingsGoals = async () => {
    const account = await getAccount();
    const data = await getSavingsGoals(account.accountUid);
    if (!data?.error){
      setSavingsGoals(data.savingsGoalList);
      setSavingsGoalsError({});
    }
    if(data?.error){
      setSavingsGoalsError(data);
      setSavingsGoals([]);

    
    }
  }
//Function that calculates the roundup money available to send to savings goals
  const moneyToSavings = async () => {
    const account = await getAccount();
    const data = await getStatement(account.accountUid);
    setRoundupToSavings(roundup([...data]))
  }

//Hook that builds the app the first time it is rendered
    useEffect(() => {
      findAccount();
      uploadStatement();
      uploadSavingsGoals();
      moneyToSavings()

    },[])

//React components with their routes
  return (
      <Router>
      <div className="App">
      <Header />
      {Object.keys(error).length > 0 && <h2>No data to display</h2>}
      <div className="container">
        <Routes>
          { Object.keys(error).length === 0 &&<Route path="/" element={<Main statement={statement} roundupToSavings={roundupToSavings}/>} /> }
          {Object.keys(savingsGoalsError).length === 0 &&<Route path="/savings" element={ <Savings accountUid={account.accountUid} savingsGoals ={savingsGoals} roundupToSavings={roundupToSavings} 
            setRoundupToSavings={setRoundupToSavings}  setSavingsGoals={setSavingsGoals}/>}/>}
        </Routes>
      </div>
      <Footer />

    </div>
    </Router>
      
 
    
  );
}

export default App;
