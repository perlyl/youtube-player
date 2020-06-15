import React, { Component } from 'react';
import { LocalStorageSet, MakeGetRequest, HandleServerError } from '../Helpers';
import { Link } from 'react-router-dom';
import * as constants from '../Constants';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: ''
        }
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        const loginDetails = {
            userName: this.state.userName,
            password: this.state.password
        }
        MakeGetRequest(constants.SERVER_URL + 'login', loginDetails,  (err, res) =>{
            if (err) {
                if(err.status == 401){
                    alert("Incorrect user name or password")
                }
                else{
                    HandleServerError() 
                }
                return
            }
            else {
                LocalStorageSet(constants.LOCAL_STORAGE_KEY.USER_DETAILS, res);
                this.props.history.push('/youtube-player');
            }
        })
    }
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }
    render() {
        return (
            <div className="login">
                <h1>Login</h1>
                <form onSubmit={this.mySubmitHandler}>
                    <p>Enter user name:</p>
                    <input
                        type='text'
                        name='userName'
                        onChange={this.myChangeHandler}
                    />
                    <p>Enter password:</p>
                    <input
                        type='password'
                        name='password'
                        onChange={this.myChangeHandler}
                    />
                    <br />
                    <br />
                    <button type='submit'>Login</button>
                </form >
                <br/><br/><br/>
                <Link to="/signup">Not a memeber? Sign up now</Link>
            </div>
        );
    }
};

export default SignIn;