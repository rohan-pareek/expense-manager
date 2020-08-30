import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/User';

function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            props.login(JSON.stringify({ userID: email, password: password }));
            setEmail('')
            setPassword('')
        }
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h4>Login here</h4>
            <div className="form-group">
                <input type="email" className="form-control" placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)} value = {email}
                />
            </div>
            <div className="form-group">
                <input type="password" className="form-control" placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)} value = {password}
                />
            </div>
            <button type="submit" className="btn btn-success">{props.loading ? 'Please wait...' : 'Login'}</button>
        </form>
    )
}

const mapStateToProps = (state) => ({
    loading: state.user.loader
})

export default connect(mapStateToProps, {
    login
})(Login);
