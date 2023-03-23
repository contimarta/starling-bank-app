import axios from "axios";
import { statementFormatting } from "./statementFormatting.js"; 
import {generateUID} from "./generateTransactionUid.js"

class BankDataServices{
    accessToken="eyJhbGciOiJQUzI1NiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_31Uy5KbMBD8lS3OO1uYN9xyyw_kAwZpsFUWEiUJb7ZS-fcIJIzxunLs7nn0aAb-JMLapEtwEsBp1B_WoZFCnXtU1w-mx-Q9sXPvI3qeY1qUGTR10UDB0wFaOhVQly2r-rRiVA8-mH5PSXeq6vZUllXWvicCXSDSqs0WAhnTs3I_teRkfgnuaw91XjYcT9Ag5VC0fQFNWVRQ9Vnb5DWyoW59baevpEJGmlV10zKCpvdxRVmn0Pb5CfKsQp5XBbbpkuHH-sEYWRuySp77qL4CXqQtFFXWQN-fCKqs9-3SvOFtsQzM9ETLowSnwKS2xDtDyN827rLaB4UjvRTc1_QkCE7KiUGQOfJSWHdgIuDceOMdceHuICjOIbuMdI_c8acRjt5wdhdthPVrBKG4uAk-owzBPUpULFpjaDgwrZzRMjRamKhpNQgzohNagR5gmBW3d8neu28gtGazdXrcRqQRRSwsyRtR5w6nSX7d0Ro1ouLoqOMkyZfYYNTMldwyyGRoIEPeu_2fFGwEbZLoL0QoR2ezzvGY-F2MqWTYBbfpRnLo3WDHPFzViNehJvwi2qQA4hAB7EEgRjzHmSLhOxu1rSXEP8jOoLLIdteehn6W127bLu3U7iDg3UTAW4HlRvy9jcLtNaVm3sRDhZUAvRzJMxuzjB6E3EYKMx6oNcoQIzG5A7BHKTz4ujyDMooWb36nFs56t3Xg4nAH7ltmeD9f-FWJXXxRaxdDUXYhPkviEN8v0uScn3eeIpxw-6b8D3S9bdCGP7Q_slvfI_siH_SnuvOO1gUye3umJj5Eau4tM_5xl7vZujxya9Tjca37e7625O8_KjhIphkGAAA.k83fB57k9dp-lCTjasbHWWPUJklf7yCTUWuW2t5LsFxKmqvzE9g2G_oUkASOT5lof4Wn7yVZjUGZgHn83GgDIPVSBVNI0lqowzZgy029yJa97mwtQBUfKOYgPAeVTarvKPg_qoGKFXvfhA67x0J0rhuyQhdIEHlZmDeO13PDfEUl5Niu7tNwikOAKD62j3cJmpsK_CBfO1q4WfAIuPbfnRC7Y9Kg_K2c2Nz9rz65bQPfJkePWYwnfymEuYOTqX6AuIZdpapr-w_QZ3wM4SEhk-L0QJWn_cW7hHrvF1HVLy5SbXNLh1rZksbYfmqRgZCqXusbKg1lPQlTv1Awz3V4o-N8kKTrhz2cbk9xxMvqW-G5D3FX7LMjfiRSvjMu15zUVUqJDZwwHSlVOxuaarI3Vw1G0QxjYDhT9ZR0eZbVOtZ-1AAth2NHWriEBREalfJY8yQI_6_ZJqxDDG8VuXeJOsFYe1pUkap1GwIoNkISxq9WX-kEBiQdpklFZ-en846phMZ-FqfajQwMPv5k9BUzeHG3bdbxxHuvGfQBoCTnh6k2H0Mfrw5FzzfYI4jIFNOlgrtWyASFZ2Uq2j1Hzzu6Otzx-U_RE_vRobpK6qLoubOxnj-YZgaozASZsmyqyxHU1RADtwL0kYCQ3Am8YJLiVg6WORCHsIbyJxri3-Jm5Zk"
    //Headers that will be used in all the requests
    configJSON = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.accessToken}`,
            'User-Agent': 'Marta Conti',
        }}  
    configCSV = {
            headers: {
                'Accept': 'text/csv',
                'Authorization': `Bearer ${this.accessToken}`,
                'User-Agent': 'Marta Conti'
            }}

//This function makes a get request to Starling Bank API and returns the accountUid of the first account of the user
 getAccountUid = async () => {
    try {
        const urlAccount = 'https://api-sandbox.starlingbank.com/api/v2/accounts';   
        const response = await axios.get(urlAccount, this.configJSON)
        return response.data.accounts[0]
    } catch (e) {
        return {error: e.code, message: e.message} ;
    }};

//This function makes a get request to Starling Bank API and returns the statement formatted as an array
 getAccountStatementAsync = async (accountUid) => {

    try{
        const urlStatement = `https://api-sandbox.starlingbank.com/api/v2/accounts/${accountUid}/statement/download?yearMonth=2023-03`;
        const statement= await axios.get(urlStatement, this.configCSV)
        return statementFormatting(statement);
    } catch (e) {
         return {error: e.code, message: e.message} ;
    }}

//This function makes a put request to Starling Bank API with payload given by the user
 createSavingsGoalAsync = async (accountUid, name,target) => {
    const data = {
            "name": name,
            "currency": "GBP",
            "target": {
              "currency": "GBP",
              "minorUnits": target
            }
           
          }
          try{
            const urlCreateSavings = `https://api-sandbox.starlingbank.com/api/v2/account/${accountUid}/savings-goals`
            const savingsGoal = await axios.put(urlCreateSavings, data, this.configJSON)
            return savingsGoal.data;
        } catch (e) {
             return {error: e.code, message: e.message} ;
        }}

//This function makes a get request to Starling Bank API and returns all the savings goals for a given account
  
 getAllSavingsGoalsAsync = async (accountUid) => {
    try{
        const urlAllSavingsGoals = `https://api-sandbox.starlingbank.com/api/v2/account/${accountUid}/savings-goals`;
        const allSavingsGoals = await axios.get(urlAllSavingsGoals, this.configJSON)
        return allSavingsGoals.data;
    } catch (e) {
         return {error: e.code, message: e.message} ;
    }
}

//This function makes a put request to Starling Bank API with payload given by the frontend and also a transactionUID generated in a separate function, generateUID.
 transferToSavingsGoalAsync = async (accountUid, savingsGoal, amount) => {
    const transactionUID = generateUID()
    const body= {
        amount: {
            currency: "GBP",
            minorUnits: amount
        }}
    try{
        const savingsGoalUid = savingsGoal.savingsGoalUid;
        const urlAddMoney = `https://api-sandbox.starlingbank.com/api/v2/account/${accountUid}/savings-goals/${savingsGoalUid}/add-money/${transactionUID}`;
        const transfer = await axios.put(urlAddMoney, body, this.configJSON)
        return transfer.data;
    } catch (e) {
         return {error: e.code, message: e.message} ;
    }
}
}

export default BankDataServices;