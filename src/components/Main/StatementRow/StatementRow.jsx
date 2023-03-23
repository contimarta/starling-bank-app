
const StatementRow = ({statementRow})=> {
    
    const {date,reference,amount,balance} = statementRow;
    
    return(
        <tr>
            <td>{date}</td>
            <td>{reference}</td>
            <td>{amount}</td>
            <td>{balance}</td>
        </tr>
   
    )
}

export default StatementRow;