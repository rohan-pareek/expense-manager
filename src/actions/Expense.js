import { FETCH_EXPENSE, SET_LOADER, SET_SUCCESS, SET_ERROR } from '../actionTypes';
import { API_URL } from '../config';

export const addExpense = (payload) => {
    return async (dispatch) => {
        dispatch({type: SET_LOADER, payload: true})
        dispatch({type: SET_SUCCESS, payload: ''})
        dispatch({type: SET_ERROR, payload: ''})
        fetch(API_URL + '/expense/addExpense', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: payload
        })
        .then(res => res.json())
        .then(data => {
            dispatch({type: SET_LOADER, payload: false})
            if(data.statusCode === 0) {
                dispatch({type: SET_ERROR, payload: data.statusMessage})
            } else {
                dispatch({type: SET_SUCCESS, payload: data.statusMessage})
                const param = {
                    userID: sessionStorage.getItem('userData')? JSON.parse(sessionStorage.getItem('userData')).userID: null 
                }
                dispatch(fetchExpenses(JSON.stringify(param)))
            }
        })
    }
}

export const fetchExpenses = (payload) => {
    return async (dispatch) => {
        dispatch({type: SET_LOADER, payload: true})
        fetch(API_URL + '/expense/fetchExpenses', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: payload
        })
        .then(res => res.json())
        .then(data => {
            dispatch({type: SET_LOADER, payload: false})
            if(data.statusCode === 0) {
                dispatch({type: SET_ERROR, payload: data.statusMessage})
            } else {
                dispatch({type: FETCH_EXPENSE, payload: data.data})                
            }
        })
    }
}
