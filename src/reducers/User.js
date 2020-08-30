import { CREATE_USER, LOGIN_USER, LOGOUT_USER, SET_LOADER, SET_ERROR, SET_SUCCESS, SET_USER } from '../actionTypes/index';

export default (state = { userData: null, isLoggedIn: false, errorMessage: '', successMessage: '', loader: false }, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, isLoggedIn: true }
        case CREATE_USER:
            return { ...state }
        case SET_ERROR:
            return { ...state, errorMessage: action.payload, successMessage: '' }
        case SET_SUCCESS:
            return { ...state, errorMessage: '', successMessage: action.payload }
        case SET_LOADER:
            return { ...state, loader: action.payload }
        case SET_USER:
            sessionStorage.setItem('userData', JSON.stringify(action.payload))
            return { ...state, userData: action.payload, isLoggedIn: true, successMessage: '', errorMessage: '' }
        case LOGOUT_USER:
            sessionStorage.removeItem('userData')
            return { ...state, userData: null, isLoggedIn: false, successMessage: '', errorMessage: '' }
        default:
            return state;
    }
}