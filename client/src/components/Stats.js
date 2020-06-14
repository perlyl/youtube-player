
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { MakeGetRequest, HandleServerError, localStorageGet } from '../Helpers'
import * as constants from '../Constants';

class Stats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // users: [],
            actionsLog: [],
            currentUser: JSON.parse(localStorageGet(constants.LOCAL_STORAGE_KEY.USER_DETAILS)),
        }
        // MakeGetRequest(constants.SERVER_URL + 'getUsers', null, (err, res) => {
        //     if (err) {
        //         HandleServerError()
        //         return
        //     }
        //     else {
        //         this.setState({ users: JSON.parse(res) });
        //     }
        // })
        // let conditions = [
        //     { key: 'userid', operator: '==', value: this.state.currentUser.userid }
        // ]
        MakeGetRequest(constants.SERVER_URL + 'getActionsLog', null, (err, res) => {
            if (err) {
                HandleServerError()
                return
            }
            else {

                this.setState({ actionsLog: JSON.parse(res) });
            }
        })
    }
    renderTableData() {
        Date.prototype.yyyymmdd = function () {
            var mm = this.getMonth() + 1; // getMonth() is zero-based
            var dd = this.getDate();

            return [this.getFullYear(),
            (mm > 9 ? '' : '0') + mm,
            (dd > 9 ? '' : '0') + dd
            ].join('/') + " "+this.getHours()+":"+this.getMinutes();
        };
        return this.state.actionsLog.map((actionLog, index) => {
            const { actionId, userId,fullName, date, action, value } = actionLog

            return (
                <tr key={actionId}>
                    <td>{fullName}</td>
                    <td>{new Date(date._seconds * 1000).yyyymmdd()}</td>
                    <td>{action}</td>
                    <td>{value}</td>
                </tr>
            )
        })
    }
    gotoDashboard = ()=>{
        this.props.history.push('/dashboard');
    }
    render() {
        return (
            <div>
                <button type="button" onClick={this.gotoDashboard}>Return to YouTube player</button>
                <h1 style={{textAlign:"center"}}>Actions Log</h1>
                {/* <select>{this.state.users.map((u) => <option key={u.userId} value={u.fullName} selected={u.userId == this.state.currentUser.userId}>{u.fullName}</option>)}</select>
                <select>{Object.values(constants.ACTION_TYPE).map((a) => <option key={a} value={a}>{a}</option>)}<option selected key="all" value="all">All</option></select> */}
                <table style={{width:"100%",textAlign:"center"}}>
                    <thead>
                        <th>User Name</th>
                        <th>Date</th>
                        <th>Action</th>
                        <th>Details</th>
                    </thead>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default withRouter(Stats);