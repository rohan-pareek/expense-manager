import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchExpenses } from '../actions/Expense'

function ExpenseList({expenses, userID, fetchExpenses}) {

    useEffect(() => {
        console.log('use eff called')
        const param = {
            userID: sessionStorage.getItem('userData')? JSON.parse(sessionStorage.getItem('userData')).userID: null 
        }
        fetchExpenses(JSON.stringify(param))
    }, [fetchExpenses])

    const formatDate = (parsedDate) => {
        const date = new Date(parsedDate).getDate();
        const month = new Date(parsedDate).getMonth() + 1;
        const year = new Date(parsedDate).getFullYear();
        const hours = new Date(parsedDate).getHours()
        const minutes = new Date(parsedDate).getMinutes()

        return month + '/' + date + '/' + year + ' ' + hours + ':' + minutes;
    }

    const fetchBalance = (amounts) => {
        let balance = 0;
        expenses.forEach(expense => {
            if(expense.type === 'Income') {
                balance += expense.amount;
            } else {
                balance -= expense.amount;
            }
        })
        return balance;
    }

    return (
        <>
            <div style={{ textAlign: "right" }}>
               Total Balance: {fetchBalance()>0 ? 
                <span style = {{color: 'green', fontWeight: 'bold'}}>+{fetchBalance()}</span> 
                : <span style = {{color: 'red', fontWeight: 'bold'}}>{fetchBalance()}</span>}
            </div>
            <ul className="list-group">
                {expenses && expenses.length === 0 && 
                 <li className="list-group-item">No transaction found</li>
                }
                {expenses && expenses.map(expense => (

                    <li className="list-group-item" key={expense._id}>
                        <div className="row">
                            <div className="col-sm-7" style={{ padding: '0' }}>
                                <div><b>Category: </b>{expense.category}</div>
                                <div><b>Comment: </b>{expense.comment}</div>
                                <div
                                    style={{ marginTop: '10px', fontWeight: 'bold', color: expense.type === 'Income' ? 'green' : 'red' }}>
                                    {expense.type === 'Income' ? '+' + expense.amount : '-' + expense.amount}
                                </div>
                            </div>
                            <div className="col-sm-5" style={{ textAlign: 'right', padding: '0' }}>
                                {formatDate(expense.createdOn)}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

const mapStateToProps = (state) => ({
    expenses: state.expense.expenses,
    userID: state.user.userData ? state.user.userData.userID : null
})

export default connect(mapStateToProps, { fetchExpenses })(ExpenseList);
