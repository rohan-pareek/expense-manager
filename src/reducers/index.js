import { combineReducers } from 'redux';
import user from './User';
import expense from './Expense';

const rootReducer = combineReducers({
    user,
    expense
})

export default rootReducer;