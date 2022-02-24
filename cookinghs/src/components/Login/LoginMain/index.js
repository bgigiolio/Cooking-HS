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
        valid: false,
        username: "",
        password: "",
        validUsers: [
            {username: "user", password: "user", email: "user@user.com", name: "Mr. User"},
            {username: "admin", password: "admin", email: "admin@admin.com", name: "Ms. Admin"}
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
                    this.setState({
                        valid: true
                    }, () =>console.log(this.state.valid));
            }
        }
        console.log("valid: {}", this.state.valid)
    };

    // checkLogin = () => {
    //     console.log("Login Checked")
    //     const users = this.state.validUsers
    //     const user = {
    //         username: this.state.username,
    //         password: this.state.password
    //     }
    //     console.log(user.username)
    //     console.log(user.password)
    //     for (let index = 0; index < users.length; index++) {
    //         const entry = Object.entries(users[index])
    //         if (entry[0][1] == user.username && entry[1][1] == user.password) {
    //                 console.log("login valid")
    //                 this.state.valid = true;
    //         }
    //     }
    // }


    change = (event, val) => {
        if (this.state.tabVal === 0){
            this.setState({tabVal: 1});
        } else{
            this.setState({tabVal: 0});
        }
    }


    render() {
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
                        valid={this.state.valid}/> : null}
                </TabPanel>
                <TabPanel value={this.state.tabVal} index={1}>
                    {this.state.tabVal ? <Signup/> : null}
                </TabPanel>
                </TabContext>
            </div>
        </div>
        )
    }
}
export default LoginMain;