
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { MakeGetRequest, HandleServerError, LocalStorageGet,MakePostRequest } from '../Helpers'
import * as constants from '../Constants';

class Stats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            actionsLog: [],
            currentUser: JSON.parse(LocalStorageGet(constants.LOCAL_STORAGE_KEY.USER_DETAILS)),
        }
        MakeGetRequest(constants.SERVER_URL + 'getUsers', null, (err, res) => {
            if (err) {
                HandleServerError()
                return
            }
            else {
                this.setState({ users: JSON.parse(res) });
            }
        })
        this.getActionsLog(this.state.currentUser.userId)
    }
    getActionsLog(userId){
        let conditions = [
            { key: 'userId', operator: '==', value: userId}
        ]
        MakePostRequest(constants.SERVER_URL + 'getActionsLog', {conditions:conditions}, (err, res) => {
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
            var mm = this.getMonth() + 1;
            var dd = this.getDate();

            return [this.getFullYear(),
            (mm > 9 ? '' : '0') + mm,
            (dd > 9 ? '' : '0') + dd
            ].join('/') + " " + this.getHours() + ":" + this.getMinutes();
        };
        return this.state.actionsLog.map((actionLog, index) => {
            const { actionId, userId, fullName, date, action, value, duration } = actionLog

            return (
                <tr key={actionId}>
                    <td>{fullName}</td>
                    <td>{new Date(date._seconds * 1000).yyyymmdd()}</td>
                    <td>{action}</td>
                    <td>{value}</td>
                    <td>{duration}</td>
                </tr>
            )
        })
    }
    gotoYoutubePlayer = () => {
        this.props.history.push('/youtube-player');
    }
    userChange = (event)=>{
        const fullName = event.target.value
        let userSelected
        for(let i=0;i<this.state.users.length;i++){
            let user = this.state.users[i]
            if(user.fullName == fullName){
                userSelected = user;
                break
            }
        }
        this.getActionsLog(userSelected.userId)
       
    }
    render() {
        return (
            <div className="stats">
                <button type="button" onClick={this.gotoYoutubePlayer}>Return to YouTube player</button>
                <h1>Actions Log</h1>
                <div className="filter">
                <span>Filter By user:</span>
                <select onChange={this.userChange}>{this.state.users.map((u) => <option key={u.userId} selected={u.userId == this.state.currentUser.userId}>{u.fullName}</option>)}</select>
                {/* <select><option selected key="all" value="all">All</option>{Object.values(constants.ACTION_TYPE).map((a) => <option key={a} value={a}>{a}</option>)}</select> */}
                </div>
                <table>
                    <thead>
                        <th>User Name</th>
                        <th>Date</th>
                        <th>Action</th>
                        <th>Details</th>
                        <th>Duration</th>
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