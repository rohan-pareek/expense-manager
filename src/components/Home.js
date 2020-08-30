import React from 'react';
import home from '../images/home.jpg';
import Login from './Login';
import Signup from './Signup';
import { connect } from 'react-redux';

function Home(props) {
    return (
        <div className="home">
            <div className="container" style={{ marginTop: '50px' }}>
                <div className="row">
                    <div className="col-sm-8" style = {{textAlign: 'center'}}>
                        <h1><i>Take care of your expenditure and savings for free</i></h1>
                        <img src={home} alt="Expense" style={{ width: '100%' }} />
                    </div>
                    <div className="col-sm-4">
                        {props.error && <div className="alert alert-warning">
                            {props.error}
                        </div>}
                        {props.success && <div className="alert alert-success">
                            {props.success}
                        </div>}
                        <Login />
                        <Signup />
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    success: state.user.successMessage,
    error: state.user.errorMessage,
    loading: state.user.loader
})



export default connect(mapStateToProps, null)(Home);
