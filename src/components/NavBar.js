import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

function NavBar(props) {

    useEffect(() => {
        if(sessionStorage.getItem('userData')) {
            props.setUser(JSON.parse(sessionStorage.getItem('userData')))
        }
    }, [])


    const logout = () => {
        props.logout();
        props.history.push('/')
    }

    return (
        <nav className="navbar">
            <div className="logo">Expense Tracker</div>
            {props.isLoggedIn && props.user && <ul>
                <li>{props.user.userID}</li>
                <li style = {{cursor: 'pointer'}} onClick = {logout}>Logout</li>
            </ul>}
        </nav>
    )
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    user: state.user.userData
})

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch({ type: 'LOGOUT_USER' }),
        setUser: (data) => dispatch({ type: 'SET_USER', payload: data }),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
