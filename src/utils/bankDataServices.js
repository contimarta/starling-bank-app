import axios from "axios";
import { statementFormatting } from "./statementFormatting.js";

class BankDataServices{
    accessToken="eyJhbGciOiJQUzI1NiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_31Uy5KbMBD8lS3OO1sYMK9bbvmBfMAgjWzVComSxG62Uvn3CCSM8bpy7O559GgG_mTSuazPcJLAaTRvzqNVUl8G1O9vzIzZa-bmIUQMvMS8OhfQNlULFc8FdHSqoDl3rB7ymlEjQjD9nrL-VDdt29VNV71mEn0iTnm5EMiYmbX_aRQn-0vyUFs05bnleIIWqYSqGypoz1UN9VB0bdkgE00XanvzTjplnFpe8baAChsBVVE0gHxAyAuRC8yLTjRNyAhj_WCMnItZZ152QznUwKu8g6ouWhiGE0FdDKFdXra8q5aBmZloeZToFJgyjnhvCfnLxl1X-6BxpKeC_5oeBMlJeykk2SOvpPMHJgHObTDeE5f-BqLiPbLrSLfIHX9a6ekFZ381VrqwRpCayw_JZ1QxeECFmiVrDC0HZrS3RsVGC5M0o4W0I3ppNBgBYtbc3SR3676B2JrNzptxG5FGlKmwomBEX3qcJvV1Q2vUiJqjp56TolBig0mz7-SXQSZLgiwF7-5_UrQRtUkho_ACni52neM-8buYUsmyK27TjeQxuMGeBbiqCa9DTfhFtEkRpCEi2INAjnhJMyUidLZ6W0uMv5O9Re2Q7a4DDcOs3vttu7RTu4OIdxMRbwWWGwn3Nkq_11SGBRN3FVYCzHIkj2zKskZItY0UZzxQa5QlRnLyB-COUnzwdXkWVRIdfoSdOriY3daBS8MduG-Z8f1C4WcldvFJrV2MRdmV-KyIQ3q_RJP3Yd55SnDC7ZsKP9D1tsFYftf-yG59j-yTfDCf-sZ7WhfI3McjNXGRqHlwzIbHXe5m63LPrVH3x7Xu7_Hasr__AHWAB-QZBgAA.jbsu5t8vWEvs6co9MjrzsM2uHVHHIx-ufNr50MXiBh-X4S5jfIHeIVWgeuXHsemhKvFS5rOZ4Mj0ecAY1OwK9CCs0HbZBTzzAvGJGNxf0edVehDZuWNII984kNJo0VXttICXB4nrOPYN5uQGfhWEEm97v-bSoRYPY6XmVS-8-_hN42-tAja9SsWUtKyOgz-OU3WyAVz5Xputi5xjxKkJavSqf7g9CYg7ENwTRMNlYEOFCCDzCf7nBdbMLQexpXrBA8847G5E8jeBWgLK7sfAwH9qQxAVjYI2GBNTT5EfvYRUi3iMWVC5YIjNneFMLNvb4_LuJ9DKxbYIirTqsEKQaWm8BwTFQUwSBpLIoc-TSJd5Ckgfzku_-8Nvio-RrWiCLX_RkeCmHV-fL3QiodJyMyIgTP2UTm9hdcUbGRiOkYNjI7oFT9ubTY4CwqhSHZA5QWFUQ8_xvIv6_y_H0Vo0swNTSqW9J_MC9bIf-EUCr8btixeyCkcWCosSv2KgzaWwdCfIKE_Ly_Ve0kmm32qsz5ngSHvGnGd1XWKGRpxZcV9zvo3BOXNwyJ-TuhBKFnh8fZbcD7yuFxUvTX9koF-xHY76IyAXRUPpk4XYS2UEH87GASGfwY8ehKW7K9fx6lAvshtdEgmoxUsYpp1XseyzhwiZopuH19voJ9ODlDSG1B8"
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

 getAccountUid = async () => {
    
    try {
        const urlAccount = 'https://api-sandbox.starlingbank.com/api/v2/accounts';   
        const response = await axios.get(urlAccount, this.configJSON)
        return response.data.accounts[0]
    } catch (e) {
        return {error: e.code, message: e.message} ;
    }
};

 getAccountStatementAsync = async (accountUid) => {

    try{
        const urlStatement = `https://api-sandbox.starlingbank.com/api/v2/accounts/${accountUid}/statement/download?yearMonth=2023-03`;
        const statement= await axios.get(urlStatement, this.configCSV)
        return statementFormatting(statement);
    } catch (e) {
         return {error: e.code, message: e.message} ;
    }
}

 createSavingsGoalAsync = async (accountUid, name,target) => {

    const data = {
            "name": name,
            "currency": "GBP",
            "target": {
              "currency": "GBP",
              "minorUnits": target
            },
            "base64EncodedPhoto": "string"
          }
          try{
            
            const urlCreateSavings = `https://api-sandbox.starlingbank.com/api/v2/account/${accountUid}/savings-goals`
            const savingsGoal = await axios.put(urlCreateSavings, data, this.configJSON)
            return savingsGoal.data;
        } catch (e) {
             return {error: e.code, message: e.message} ;
        }
          
}

 getAllSavingsGoalsAsync = async (accountUid) => {

    
    try{
        const urlAllSavingsGoals = `https://api-sandbox.starlingbank.com/api/v2/account/${accountUid}/savings-goals`;
        const allSavingsGoals = await axios.get(urlAllSavingsGoals, this.configJSON)
        return allSavingsGoals.data;
    } catch (e) {
         return {error: e.code, message: e.message} ;
    }
}


 getSavingsGoalAsync = async (name) => {
try{
    const allGoals = await getAllSavingsGoalsAsync();
    
    for (const Goal of allGoals.savingsGoalList){

        if (Goal.name === name){
        // console.log(Goal);
            return Goal
        }
    }}
catch(e){
    return {error: e.code, message: e.message} ;
}}



 generateUID() {
    const values = "0123456789abcd";
    const sections = [
      generateRandomSection(8, values),
      generateRandomSection(4, values),
      4+generateRandomSection(3, values),
      generateRandomSection(4, values),
      generateRandomSection(12, values)
    ];
    return sections.join("-");
  }
  
     generateRandomSection(length, possibleValues) {
        let result = "";
        for (let i = 0; i < length; i++) {
        result += possibleValues.charAt(Math.floor(Math.random() * possibleValues.length));
        }
        return result;
  }

 transferToSavingsGoalAsync = async (name,amount) => {

    
    const data={
        "amount": {
          "currency": "GBP",
          "minorUnits": amount
        }
      }
    
    try{
        const transferUid = generateUID();
        const accountUid = await getAccountUid();
        const savingsGoal = await getSavingsGoalAsync(name);
        const savingsGoalUid = savingsGoal.savingsGoalUid;
        const urlAddMoney = `https://api-sandbox.starlingbank.com/api/v2/account/${accountUid}/savings-goals/${savingsGoalUid}/add-money/${transferUid}`;
        const transfer = await axios.put(urlAddMoney, data, this.configJSON)
        // console.log(transfer.data)
        return transfer.data;
    } catch (e) {
         return {error: e.code, message: e.message} ;
    }
}
}

export default BankDataServices;