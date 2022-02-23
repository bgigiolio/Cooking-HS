import React, { useDebugValue } from 'react';
// import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
// import TabList from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";


import Login from "./../Login";
import Signup from "./../Signup";
import './styles.css';

class LoginMain extends React.Component {
    recieveInput = event =>{
        const target = event.target;
        // const value = target.value;
        const name = target.name;
    }

    state = {
        tabVal: "0",
        username: "",
        password: "",
        validUsers: [
            {username: "user", password: "user", email: "user@user.com", name: "Mr. User"},
            {username: "admin", password: "admin", email: "admin@admin.com", name: "Ms. Admin"}
        ]
    }   

    change = (event, val) => {
        if (this.state.tabVal === 0){
            this.setState({tabVal: 1});
        } else{
            this.setState({tabVal: 0});
        }
        console.log(this.state.tabVal)
    }


    render() {
        return(
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
                        recieveInput={this.recieveInput}/> : null}
                </TabPanel>
                <TabPanel value={this.state.tabVal} index={1}>
                    {this.state.tabVal ? <Signup/> : null}
                </TabPanel>
                </TabContext>
            </div>
        )
    }
}

{/* <TabContext value={this.state.tabVal}>
<Box id="tabBox">
    <TabList onChange={this.change}>
        <Tab label="Login" value="1"/>
        <Tab label="Signup" value="2"/>
    </TabList>
</Box>
<TabPanel value="1">
    <Login
        username={this.state.username}
        password={this.state.password}
        recieveInput={this.recieveInput}/>
</TabPanel>
<TabPanel value="2">
    <Signup/>
</TabPanel>
</TabContext> */}
export default LoginMain;