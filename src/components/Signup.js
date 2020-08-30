import React, { useState } from 'react'
import { connect } from 'react-redux'
import { signup } from '../actions/User';

function Signup(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password && password2 && password === password2) {
            props.signup(JSON.stringify({ userID: email, password: password }));
            setEmail('');
            setPassword('');
            setPassword2('');
        }
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h4>Create your account</h4>
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
            <div className="form-group">
                <input type="password" className="form-control" placeholder="Confirm password"
                    onChange={(e) => setPassword2(e.target.value)} value = {password2}
                />
            </div>
            <button type="submit" className="btn btn-info">Create</button>
        </form>
    )
}

const mapStateToProps = (state) => ({
    loading: state.user.loader
})

export default connect(mapStateToProps, {
    signup
})(Signup);
