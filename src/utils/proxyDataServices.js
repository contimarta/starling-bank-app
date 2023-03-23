import axios from "axios";

//These are the functions available to make the requests to the middleman server from the Frontend
export const getAccount = async () => {
    try{const response = await axios.get("http://localhost:4000/account");
        return response.data;}
    catch(error){return {error:error.message}}
}

export const getStatement = async (accountUid) => {
    try{const response = await axios.get(`http://localhost:4000/statement/`,{params: { accountUid}});
    
        return response.data;}
    catch(error){return {error:error.message}}
}

export const getSavingsGoals = async (accountUid) => {
    const response = await axios.get("http://localhost:4000/savings-goals",{params: { accountUid}});
        return response.data;
}

export const getOneSavingsGoal = async (accountUid, name) => {
    try{
    const allGoals = await getSavingsGoals(accountUid);
    for (const Goal of allGoals.savingsGoalList){
        if (Goal.name === name){
            return Goal
        }
    }}
    catch(e){
    return {error: e.code, message: e.message} ;
}}

export const newSavingsGoal = async (accountUid, name,target) => {
    try{const response = await axios.post("http://localhost:4000/savings-goals/new-goal",{accountUid, name, target});
        return response.data;}
    catch(error){return {error:error.message}}
}

export const addMoney = async (accountUid,savingsGoal, amount) => {
    try{const response = await axios.post("http://localhost:4000/savings-goals/add-money", {accountUid,savingsGoal, amount});
    return response.data;}
    catch(error){return {error:error.message}}
}