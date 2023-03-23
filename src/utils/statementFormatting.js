
export const statementFormatting = (statement) => {

    const Formatting = statement.data.split("\n")

        for (let i = 0; i < Formatting.length; i++) {
            Formatting[i] = Formatting[i].split(",")
        }
        const statementArray = [];
        
        for (let i=1; i<Formatting.length-1; i++) {
            const statementObject = {};
            for (let j=0; j<8; j++){
                statementObject["date"]=Formatting[i][0]
                statementObject["counterParty"]=Formatting[i][1]
                statementObject["reference"]=Formatting[i][2]
                statementObject["type"]=Formatting[i][3]
                statementObject["amount"]=Formatting[i][4]
                statementObject["balance"]=Formatting[i][5]
                statementObject["spendingCategory"]=Formatting[i][6]
                statementObject["notes"]=Formatting[i][7]
            }
            statementArray.push(statementObject)
            
        
        }
      
        return statementArray
    }