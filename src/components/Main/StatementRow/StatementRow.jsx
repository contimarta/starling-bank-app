import "./StatementRow.css"

const StatementRow = ({statementRow})=> {
    
    const {date,reference,amount,balance} = statementRow;
    
    return(
        <tr className="row">
            <td>{date}</td>
            <td>{reference}</td>
            <td>{amount}</td>
            <td>{balance}</td>
        </tr>
   
    )
}

export default StatementRow;