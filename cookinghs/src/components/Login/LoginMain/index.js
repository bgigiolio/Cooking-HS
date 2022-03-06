import React, { useDebugValue } from 'react';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';

import Login from "./../Login";
import Signup from "./../Signup";
import './styles.css';

class LoginMain extends React.Component {
    state = {
        tabVal: 0,
        //Login
        valid: false,
        username: "",
        password: "",
        currentUser: {username: null, password: null, email: null, name: null, admin: false},
        routeTo: "/recipes",
        //Signup
        sUsername: "",
        sPassword: "",
        sEmail: "",
        sName: "",
        password2: "",
        sValid: 0, // -2 is confirm password dont match, -1 is username in use, 1 is seen true, 0 is never seen (potentially add more for specific issues)


        validUsers: [
            {username: "user", password: "user", email: "user@user.com", name: "Mr. User", admin: false},
            {username: "admin", password: "admin", email: "admin@admin.com", name: "Ms. Admin", admin: true}
        ]
    }   
    recieveInputLogin = event =>{
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => this.checkInput());
    }

    checkInput = () =>{

        const users = this.state.validUsers
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        // console.log(user.username)
        // console.log(user.password)
        this.setState({
            valid: false
        }, () =>console.log(this.state.valid));
        for (let index = 0; index < users.length; index++) {
            const entry = Object.entries(users[index])
            if (entry[0][1] == user.username && entry[1][1] == user.password) {
                    console.log("login valid")
                    let route = "/recipes"
                    if (entry[4][1]){
                        route = "/admin"
                    }
                    this.setState({
                        valid: true,
                        currentUser: users[index],
                        routeTo: route
                    }, () =>console.log(this.state.currentUser));
            }
        }
        console.log("Login validated" )
    };

    change = (event, val) => {
        if (this.state.tabVal === 0){
            this.setState({tabVal: 1});
        } else{
            this.setState({tabVal: 0});
        }
    }

    validateSignup = () => {
        let valid = 1
        const sUsers = this.state.validUsers
        const sUser = {
            username: this.state.sUsername,
            password: this.state.sPassword,
            password2: this.state.password2
        }
        
        for (let index = 0; index < sUsers.length; index++) {
            const entry = Object.entries(sUsers[index])
            if (entry[0][1] == sUser.username){
                valid = -1
            }else if( sUser.password != sUser.password2){
                valid = -2
            }
            
        }
        this.setState({
            sValid: valid
        }, () =>console.log(this.state.sValid));

        if (this.state.sValid) {
            const newUser = {
                username: this.state.sUsername,
                password: this.state.sPassword,
                email: this.state.sEmail,
                name: this.state.sName,
                admin: false
            }
            this.state.validUsers.push(newUser)
        }
    }


    render() {
        this.state.currentUser = this.props
        return(
        <div id="LoginMain">
            <div id="TabsHolder">
                <TabContext value={this.state.tabVal}>
                <Tabs value={this.state.tabVal} onChange={this.change}>
                    <Tab label="Login" id= "LoginTab"/>
                    <Tab label="Sign up" id= "SignupTab"/>
                </Tabs>
                <TabPanel value={this.state.tabVal} index={0}>
                    {!this.state.tabVal ?
                        <Login
                        username={this.state.username}
                        password={this.state.password}
                        recieveInput={this.recieveInputLogin}
                        valid={this.state.valid}
                        routeTo={this.state.routeTo}/> : null}
                </TabPanel>
                <TabPanel value={this.state.tabVal} index={1}>
                    {this.state.tabVal ? <Signup
                                            sUsername={this.state.sUsername}
                                            sPassword={this.state.sPassword}
                                            sName={this.state.sName}
                                            sEmail={this.state.sEmail}
                                            password2={this.state.password2}
                                            sValid={this.state.sValid}
                                            recieveInput={this.recieveInputLogin}
                                            validSignup={this.validateSignup}/> : null}
                </TabPanel>
                </TabContext>
            </div>
        </div>
        )
    }
}
export default LoginMain;