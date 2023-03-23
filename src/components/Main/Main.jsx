import StatementRow from "./StatementRow/StatementRow.jsx"
import { Link } from "react-router-dom";
import "./Main.css"

function Main(props) {
//destructuring props
    const { statement, roundupToSavings } = props;
//Shorten the statement to make it easier to display
    const shortStatement = statement.slice(-15).reverse()
//Loop through the statement to display each transaction as a row
    const statementList = shortStatement.map((statementRow,index) => <StatementRow key={index} statementRow={statementRow}/>);
   
//React components for the main page. The statement is displayed, the round up money, and a button to access the savings goals.
//Some logic is added to display skeletons while loading the data
    return(
    <div className="statementList"> 
        {statement.length === 0 && <h2>Statement is loading...</h2>}
        <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Reference</th>
                        <th>Amount</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Create a set of table rows for each transaction in the statement array */}
                    {statement.length > 0 && statementList}
                    {statement.length === 0 && <tr><td colSpan={statementList.length}>Transaction is loading...</td></tr>}
                </tbody>
            </table>
            <p>You have £{roundupToSavings.toFixed(2)} round up money available! Go to savings goals to use it.</p>
            <Link to='/savings'><button>Savings Goals</button> </Link>
      
    </div>)
}

export default Main;