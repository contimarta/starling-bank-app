function Savings(props) {
    const {savingsGoals, roundupToSavings} = props;
    const savingsGoalList = savingsGoals.savingsGoalList[1].name

    return(
    <div> 
        <h1>Savings</h1>
        <h2>Savings Goals: {`${savingsGoalList}`}</h2>
        <p>You can send £{roundupToSavings.toFixed(2)}</p>

    </div>)
}

export default Savings;