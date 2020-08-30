import { CREATE_USER, LOGIN_USER, SET_LOADER, SET_ERROR, SET_SUCCESS, SET_USER } from '../actionTypes/index';
import { API_URL } from '../config';

const setLoader = (condition) => {
    return {
        type: SET_LOADER,
        payload: condition
    }
}

const setError = (message) => {
    return {
        type: SET_ERROR,
        payload: message
    }
}

const setSuccess = (message) => {
    return {
        type: SET_SUCCESS,
        payload: message
    }
}

const setUser = (data) => {
    return {
        type: SET_USER,
        payload: data
    }
}

export const login = (payload) => {
    return async (dispatch) => {
        dispatch(setLoader(true));
        fetch(API_URL + '/user/login', {
            method: 'POST',
            body: payload,
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then((data) => {
                dispatch(setLoader(false));
                if (data.statusCode === 0) {
                    dispatch(setError(data.statusMessage));
                } else {
                    dispatch(setSuccess(data.statusMessage));
                    dispatch({
                        type: LOGIN_USER
                    })
                    dispatch(setUser(data.data))
                }
            })
    }
}

export const signup = (payload) => {
    return async (dispatch) => {
        dispatch(setLoader(true));
        fetch(API_URL + '/user/signup', {
            method: 'POST',
            body: payload,
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then((data) => {
                dispatch(setLoader(false));
                if (data.statusCode === 0) {
                    dispatch(setError(data.statusMessage));
                } else {
                    dispatch(setSuccess(data.statusMessage));
                    dispatch({
                        type: CREATE_USER,
                        payload: data
                    })
                }
            })
    }
}
