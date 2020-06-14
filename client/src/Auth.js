// import React from 'react';
// import './Auth.css';
// import { MakeGetRequest, MakePostRequest, HandleError } from './Helpers'
// import * as constants from './Constants';
// import { login } from './utils';



// class Auth extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             redirectToApp: false,
//             form: '',
//             userName: '',
//             password: '',
//             fullName: '',
//             isAdmin: false
//         }
//     }

//     mySubmitHandler = (event, authType) => {
//         event.preventDefault();
//         //tbd - show error message om screen
//         if (this.state.password < 5) {
//             alert("Invalid password, Password length minimum 5")
//             return
//         }
//         if (authType === "login") {
//             const loginDetails = {
//                 userName: this.state.userName,
//                 password: this.state.password
//             }
//             MakeGetRequest(constants.SERVER_URL + 'login', loginDetails, function (err, res) {
//                 if (err) {
//                     HandleError(err)
//                 }
//                 else {
//                     login();
//                 }
//             })
//         }
//         else {
//             const newUserDetails = {
//                 fullName: this.state.fullName,
//                 userName: this.state.userName,
//                 password: this.state.password,
//                 isAdmin: this.state.isAdmin
//             }
//             MakePostRequest(constants.SERVER_URL + 'register', newUserDetails, function (err, res) {
//                 if (err) {
//                     HandleError(err)
//                 }
//                 alert("/go to app")
//             })
//         }

//     }

//     myChangeHandler = (event) => {
//         let nam = event.target.name;
//         let val = event.target.value;
//         if (nam === "isAdmin") {
//             val = event.target.checked
//         }
//         this.setState({ [nam]: val });
//     }

//     login = () => {
//         let loginForm = (
//             <form onSubmit={(e) => this.mySubmitHandler(e, "login")}>
//                 <p>Enter user name:</p>
//                 <input
//                     type='text'
//                     name='userName'
//                     onChange={this.myChangeHandler}
//                 />
//                 <p>Enter password:</p>
//                 <input
//                     type='password'
//                     name='password'
//                     onChange={this.myChangeHandler}
//                 />
//                 <br />
//                 <br />
//                 <input type='submit' />
//             </form>
//         );
//         this.setState({ form: loginForm })
//     }

//     register = () => {
//         let registerForm = (
//             <form onSubmit={(e) => this.mySubmitHandler(e, "register")}>
//                 <p>Enter full name:</p>
//                 <input
//                     type='text'
//                     name='fullName'
//                     onChange={this.myChangeHandler}
//                 />
//                 <p>Enter user name:</p>
//                 <input
//                     type='text'
//                     name='userName'
//                     onChange={this.myChangeHandler}
//                 />
//                 <p>Enter password:</p>
//                 <input
//                     type='password'
//                     name='password'
//                     onChange={this.myChangeHandler}
//                 />
//                 <p>Is Administrator?</p>
//                 <input
//                     type="checkbox"
//                     name='isAdmin'
//                     onChange={this.myChangeHandler}
//                 />
//                 <br />
//                 <br />
//                 <input type='submit' />
//             </form>
//         );
//         this.setState({ form: registerForm })
//     }
//     render() {
//         // const { from } = { from: { pathname: '/' } }
//         // const { redirectToReferrer } = this.state
//         // if (redirectToReferrer === true) {
//         //     return <Redirect to={from} />
//         // }
//         return (
//             <div class="auth">
//                 <h1>Welcome to youtube player</h1>
//                 <button type="button" onClick={this.register}>Register</button>
//                 <button type="button" onClick={this.login}>Login</button>
//                 {this.state.form}
//             </div>
//         );
//     }
// }

// export default Auth;



