import{getOneSavingsGoal, getSavingsGoals,addMoney} from "../../utils/proxyDataServices.js"
import { useState } from "react";
import NewGoal from "./NewGoal/NewGoal.jsx";
import "./Savings.css"

function Savings(props) {
    //destructuring of the props
    const {accountUid, savingsGoals, roundupToSavings, setRoundupToSavings, setSavingsGoals} = props;
    

    //variable and its setter to select the goal the user wants to add money to
    const [selectedGoal, setSelectedGoal] = useState('');

    //Function that handles the checkbox changes  
    const handleGoalChange = async (event) => {
        setSelectedGoal(event.target.value);}

    //Function that handles the submit of the checkbox form. It makes a transfer of the round up money to the selected goal
    const handleSubmit = async (event) => {
        event.preventDefault();
        const savingsGoal = await getOneSavingsGoal(accountUid, selectedGoal)
        console.log(savingsGoal)
        try{
        await addMoney(accountUid, savingsGoal, roundupToSavings.toFixed(2)*100);
        setSavingsGoals((await getSavingsGoals(accountUid)).savingsGoalList)
        setRoundupToSavings(0)
        }
        catch(error){
            return {error: error.code, message: error.message}}
        }
    
//The code below displays the round up money, the savings goals in a checkbox form that can be chosen to send the money to, and allows the user to create a new goal
return(
    <div> 
        <p className="textMoney">You can send £{roundupToSavings.toFixed(2)}!</p>
        {savingsGoals.length>0 && <form className="goalsCheckForm" onSubmit={handleSubmit}>
        <fieldset>
    <legend>Your Savings Goals</legend>
        {savingsGoals.map((goal) => (
        <div key={goal.name}>
            <input type="radio" value={goal.name} checked={selectedGoal === goal.name} onChange={handleGoalChange}/>
            <label>{`${goal.name}, £${goal.totalSaved.minorUnits/100} saved of £${goal.target.minorUnits/100} target`} </label>        
        </div>))}
        <button type="submit">Send round up to this goal</button>
        </fieldset>
        </form>}
        {savingsGoals.length===0 && <h2>Create new savings goal first!</h2>}
        {<NewGoal accountUid = {accountUid} setSavingsGoals={setSavingsGoals}/>}

    </div>)
}

export default Savings;