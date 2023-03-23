import { useState } from "react";
import {newSavingsGoal,getSavingsGoals} from "../../../utils/proxyDataServices.js"
import "./NewGoal.css"
function NewGoal ({accountUid, setSavingsGoals}){
  //Variables and setters that change when the user types in the new goal form
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");

  //Function that handles the submit of the new goal. It creates a new goal with the name and target variables set by the user
  const handleSubmitNewGoal = async (event) => {
    event.preventDefault();
    try{
      await newSavingsGoal(accountUid, name, parseFloat(target).toFixed(2)*100)
      const newList = await getSavingsGoals(accountUid)
      setSavingsGoals(newList.savingsGoalList)
      }catch(err){
        return (err.message)
      }

}

  return (<div>
    <p>Add a new Savings Goal (GBP):</p>
    <form className="newGoalForm" onSubmit={handleSubmitNewGoal}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Target:
        <input type="text" value={target} onChange={(e) => setTarget(e.target.value)} />
      </label>
      <br />
      <button type="submit">Create Savings Goal</button>
    </form>
    </div>
  );
}

export default NewGoal;