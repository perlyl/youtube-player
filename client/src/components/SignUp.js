import React, { Component } from 'react';
import { LocalStorageSet, MakePostRequest, HandleServerError, ValidateForm } from '../Helpers';
import * as constants from '../Constants';
import { Link } from 'react-router-dom';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            userName: '',
            password: '',
            isAdmin: false,
            errors: {
                fullName: '',
                userName: '',
                password: ''
            }
        }
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        if (nam === "isAdmin") {
            val = event.target.checked
        }
        this.setState({ [nam]: val });
    }

    mySubmitHandler = (event, authType) => {
        event.preventDefault();
        let errors = this.state.errors;
        errors.fullName = !this.state.fullName ? 'Full Name is required field' : '';
        errors.userName = !this.state.userName ? 'User Name is required field!' : '';
        errors.password = this.state.password.length < 8 ? 'Password must be 8 characters long!' : '';
        this.setState({ errors });
        if (!ValidateForm(this.state.errors)) {
            return
        }
        const newUserDetails = {
            fullName: this.state.fullName,
            userName: this.state.userName,
            password: this.state.password,
            isAdmin: this.state.isAdmin
        }
        MakePostRequest(constants.SERVER_URL + 'register', newUserDetails, (err, res) => {
            if (err) {
                HandleServerError()
                return
            }
            console.log("res",res)
            LocalStorageSet(constants.LOCAL_STORAGE_KEY.USER_DETAILS, res);
            this.props.history.push('/youtube-player');
        })
    }
    render() {
        const { errors } = this.state;
        return (
            <div className="register">
                <h1>Register</h1>
                <form onSubmit={this.mySubmitHandler}>
                    <p>Enter full name:</p>
                    <input
                        type='text'
                        name='fullName'
                        onChange={this.myChangeHandler}
                    />
                    {errors.fullName.length > 0 &&
                        <span className='error'>{errors.fullName}</span>}
                    <p>Enter user name:</p>
                    <input
                        type='text'
                        name='userName'
                        onChange={this.myChangeHandler}
                    />
                    {errors.userName.length > 0 &&
                        <span className='error'>{errors.userName}</span>}
                    <p>Enter password:</p>
                    <input
                        type='password'
                        name='password'
                        onChange={this.myChangeHandler}
                    />
                    {errors.password.length > 0 &&
                        <span className='error'>{errors.password}</span>}
                    <p>Is Administrator?</p>
                    <input
                        type="checkbox"
                        name='isAdmin'
                        onChange={this.myChangeHandler}
                    />
                    <br />
                    <br />
                    <button type='submit'>Register</button>
                </form>
                <br/><br/><br/>
                <Link to="/signin">Exist user?</Link>
            </div>
        );
    }
};

export default SignUp;