//Function that, given an statement represented as an array, returns the roundup value of the last 7 days spendings

export const roundup = (statement)=> {
    let transactionsLast7Days = [];

    const today = new Date();
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); 
    
    let statementReverse = statement.reverse()

    //First finds the last 7 days transactions. The statement array is reversed so that it does not need to loop through every item in the array
    for (let i = 0; i < statementReverse.length; i++) {
        let dateParts = statementReverse[i].date.split("/");
        let date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

        if (date >= oneWeekAgo && date <= today){
            transactionsLast7Days.push({date: date, amount: parseFloat(statementReverse[i].amount) });

        } else {break}
    }
//Then calculates the total amount spent
    let totalAmount = 0;
    for (let i=0; i< transactionsLast7Days.length; i++){
        totalAmount += transactionsLast7Days[i].amount<0 ? transactionsLast7Days[i].amount : 0
    }
//Finally calculates the roundup amount
    let roundupToSavings = Math.ceil(Math.abs(totalAmount))-Math.abs(totalAmount)


    return roundupToSavings;
   

}

