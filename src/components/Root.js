import React from 'react'
import NavBar from './NavBar'
import Home from './Home'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Dashboard from './Dashboard'
import { connect } from 'react-redux'

function Root(props) {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route exact path="/">
                    {props.isLoggedIn ? <Redirect to="/dashboard" /> : <Home />}
                </Route>
                <Route path = "/dashboard" component = {Dashboard} />
            </Switch>
        </Router>

    )
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn
})

export default connect(mapStateToProps, null)(Root);
