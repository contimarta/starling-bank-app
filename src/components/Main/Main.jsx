import StatementRow from "./StatementRow/StatementRow.jsx"
import { Link } from "react-router-dom";


function Main(props) {
    const { statement, roundupToSavings } = props;

    const shortStatement = statement.slice(-15).reverse()

    const statementList = shortStatement.map((statementRow,index) => <StatementRow key={index} statementRow={statementRow}/>);
   

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
            <p>You have £{roundupToSavings.toFixed(2)} to add to your savings account. Go to Savings Goals to use it!</p>
            <Link to='/savings'><button>Savings Goals</button> </Link>
      
    </div>)
}

export default Main;