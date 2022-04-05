import React from 'react';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import axios from 'axios'; // new!!
import Login from "./../Login";
import Signup from "./../Signup";
import './styles.css';
import { baseUrl } from '../../../shared/baseUrl';

const {SHA256} = require('crypto-js'); // new!!
// const bcrypt = require('bcryptjs') // new!!

class LoginMain extends React.Component {
    state = {
        tabVal: 0,
        host: baseUrl,
        _id: "",
        //Login
        valid: false,
        username: "",
        password: "",
        currentUser: null,
        routeTo: "/recipes",
        //Signup
        sUsername: "",
        sPassword: "",
        sEmail: "",
        sName: "",
        password2: "",
        sValid: 0, // -2 is confirm password dont match, -1 is username in use, 1 is seen true, 0 is never seen (potentially add more for specific issues)
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

        const user = {
            username: this.state.username,
            password: this.state.password
        }
        this.setState({
            valid: false
        }, () =>console.log("valid login: " + this.state.valid));
        if(this.state.tabVal === 0){
            axios.get(baseUrl + 'api/users', {params :{
                username : user.username,
                passHash : SHA256(user.password).toString()
              }}).then(async (response) => {
                const res = response.data
                console.log(res)
                if(res.length !== 0){
                    let route = "/recipes"
                    if (res[0].admin){
                        route = "/admin"
                    }
                    this.setState({
                        valid: true,
                        _id: res[0]._id,
                        currentUser: {
                            _id: res[0]._id,
                            username: user.username, 
                            email: res[0].email, 
                            fullName: res[0].fullName, 
                            admin: res[0].admin},
                        routeTo: route
                    }, () => console.log("user " + user.username + " may now log in"))
                }
              }, (error) => {
                console.log(error);
              });
        } else{
            // axios.get(this.state.host + 'api/users/logout')
        }
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
        const sUser = {
            username: this.state.sUsername,
            password: this.state.sPassword,
            password2: this.state.password2,
            email: this.state.sEmail,
            fullName: this.state.sName
        }
            
        // }
        //Add further checking for valid inputs below
        if(sUser.username === ""){
            valid = -1
        } else if(sUser.password !== sUser.password2){
            valid = -2
        }else if(sUser.password === ""){
            valid = -3
        }else if(sUser.email === ""){
            valid = -4
        }else if(sUser.name === ""){
            valid = -5
        }
        if (valid === 1){
            axios.post(baseUrl + 'api/users', 
            {
                username : sUser.username,
                passHash : SHA256(sUser.password).toString(),
                fullName : sUser.fullName,
                email : sUser.email
              }).then(async (response) => {
                valid = 1
              }).catch(function (error) {
                valid = -6
                console.log(error)
              });
        }
        this.setState({
            sValid: valid
        }, () =>console.log("valid user if " + this.state.sValid + " = 1"));
    }


    render() {
        // this.state.currentUser = this.props
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
                        currentUser={this.props.currentUser}
                        updateCurrentUser={this.props.updateCurrentUser}
                        host={this.state.host}
                        _id={this.state._id}
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