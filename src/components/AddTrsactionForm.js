import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addExpense, fetchExpenses } from '../actions/Expense'

function AddTrsactionForm(props) {

    useEffect(() => {
        if(props.success) {
            props.fetchExpenses(JSON.stringify({userID: props.userID}))
        }
    }, [props.success])

    const [category, setCategory] = useState('')
    const [type, setType] = useState('')
    const [amount, setAmount] = useState('')
    const [comment, setComment] = useState('')
    const categories = [
        'Entertainment',
        'Food',
        'Rent',
        'Travel',
        'Salary',
        'Misc'
    ]
    const types = [
        'Income',
        'Expenditure'
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        if (category && type && amount && !isNaN(amount)) {
            setAmount(parseInt(amount));
            const params = {
                category,
                type,
                amount,
                comment,
                userID: props.userID
            }
            props.addExpense(JSON.stringify(params));
            setCategory('')
            setType('')
            setAmount('')
            setComment('')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {props.error && <div className="alert alert-warning">
                {props.error}
            </div>}
            {props.success && <div className="alert alert-success">
                {props.success}
            </div>}

            <div className="form-group">
                <label>Category <span className = "required">*</span></label>
                <select name="category" className="custom-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option defaultValue>Select Category</option>
                    {categories.map(category => (
                        <option value={category} key={category}>{category}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Type <span className = "required">*</span></label>
                <select name="type" className="custom-select" value={type} onChange={(e) => setType(e.target.value)}>
                    <option defaultValue>Select Transaction Type</option>
                    {types.map(type => (
                        <option value={type} key={type}>{type}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Amount <span className = "required">*</span></label>
                <input type="text" className="form-control" value={amount} 
                onChange={(e) => setAmount(e.target.value)} maxLength = "8" />
            </div>
            <div className="form-group">
                <label>Comment</label>
                <textarea className="form-control" rows="3" value={comment} 
                onChange={(e) => setComment(e.target.value)} maxLength = "100">

                </textarea>
            </div>
                    <button type="submit" className="btn btn-primary" disabled = {props.loading}>{props.loading?'Please wait': 'Add'}</button>
        </form>
    )
}

const mapStateToProps = (state) => ({
    userID: state.user.userData ? state.user.userData.userID : null,
    error: state.expense.errorMessage,
    success: state.expense.successMessage,
    loading: state.expense.loading
})

export default connect(mapStateToProps, { addExpense, fetchExpenses })(AddTrsactionForm);
