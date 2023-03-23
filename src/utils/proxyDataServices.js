import axios from "axios";


export const getAccount = async () => {
    try{const response = await axios.get("http://localhost:4000/account");
        return response.data;}
    catch(error){return {error:error.message}}
}


export const getStatement = async (accountUid) => {
    try{const response = await axios.get("http://localhost:4000/statement",{params: {accountUid: accountUid}});
    
        return response.data;}
    catch(error){return {error:error.message}}
}



export const getSavingsGoals = async (accountUid) => {
    try{const response = await axios.get("http://localhost:4000/savings-goals",{params: {accountUid: accountUid}});
        return response.data;}
    catch(error){return {error:error.message}}
}

export const newSavingsGoal = async (accountUid, name,target) => {
    try{const response = await axios.post("http://localhost:4000/savings-goals/new-goal",{params: {accountUid: accountUid, name: name, target: target}});
        return response.data;}
    catch(error){return {error:error.message}}
}


export const addMoney = async (name,amount) => {
    try{const response = await axios.post("http://localhost:4000/savings-goals/add-money",{name,amount});
        return response.data;}
    catch(error){return {error:error.message}}
}