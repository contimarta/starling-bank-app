import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Main from './components/Main/Main.jsx';
import Savings from './components/Savings/Savings.jsx';
import { getAccount, getStatement,getSavingsGoals, newSavingsGoal, addMoney } from './utils/proxyDataServices.js';
import {roundup} from "./utils/roundup.js"

import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { useEffect, useState } from "react";

import './App.css';


function App() {

  const [statement, setStatement] = useState([]);
  const [savingsGoals, setSavingsGoals] = useState([]);
  const [savingsGoalsError, setSavingsGoalsError] = useState({});
  const [error, setError] = useState({});

  //Function to get statement data from utils/bankDataServices.js
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

  const uploadSavingsGoals = async () => {
    const account = await getAccount();
    const data = await getSavingsGoals(account.accountUid);
    if (!data?.error){
      setSavingsGoals(data);
      setSavingsGoalsError({});
    }
    if(data?.error){
      setSavingsGoalsError(data);
      setSavingsGoals([]);
    
    }
  
  }
  const roundupToSavings = roundup([...statement])

//Calls the getStatement function once in the first render
    useEffect(() => {
      uploadStatement();
      uploadSavingsGoals();


    },[])


  return (
      <Router>
      <div className="App">
      <Header />
      {Object.keys(error).length > 0 && <h2>No data to display</h2>}
      <div className="container">
        <Routes>
          { Object.keys(error).length === 0 &&<Route path="/" element={<Main statement={statement} roundupToSavings={roundupToSavings}/>} /> }
          {Object.keys(savingsGoalsError).length === 0 &&<Route path="/savings" element={ <Savings savingsGoals ={savingsGoals} roundupToSavings={roundupToSavings}/>}/>}
        </Routes>
      </div>
      <Footer />

    </div>
    </Router>
      
 
    
  );
}

export default App;
