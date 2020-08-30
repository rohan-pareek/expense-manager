import { ADD_EXPENSE, FETCH_EXPENSE, SET_ERROR, SET_SUCCESS, SET_LOADER } from '../actionTypes/index';

export default (state = { expenses: [], successMessage: '', errorMessage: '', loading: false }, action) => {
    switch (action.type) {
        case SET_LOADER:
            return { ...state, loading: true }
        case SET_SUCCESS:
            return { ...state, successMessage: action.payload, errorMessage: '', loading: false }
        case SET_ERROR:
            return { ...state, successMessage: '', errorMessage: action.payload, loading: false }
        case FETCH_EXPENSE:
            return { ...state, expenses: action.payload, loading: false }
        default:
            return state
    }
}
