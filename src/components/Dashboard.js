import React, { useEffect } from 'react'
import AddTrsactionForm from './AddTrsactionForm'
import ExpenseList from './ExpenseList'

export default function Dashboard(props) {
    useEffect(() => {
        if (!sessionStorage.getItem('userData')) {
            props.history.push('/')
        }
    }, [props])

    return (
        <div>
            <div className="container" style={{ marginTop: '50px' }}>
                <div className="row">
                    <div className="col-sm-4">
                        <h3>Add transaction</h3>
                        <AddTrsactionForm />
                    </div>
                    <div className="col-sm-8">
                        <h3>
                        Your Trasaction history
                        </h3>
                        <ExpenseList />
                    </div>
                </div>
            </div>
        </div>
    )
}
