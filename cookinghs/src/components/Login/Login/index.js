import { Button, TextField } from '@mui/material';
import React from 'react';
import './styles.css';
import axios from 'axios'; // new!!
import RecipeBrowser from '../../recipeView/RecipeBrowserComponent';
import AdminPage from '../../Admin/index'
import {Routes, Route, Link} from 'react-router-dom';

class Login extends React.Component {
    state = {
        failedLoginSeen: false,
        _id: "",
        host: ""
    }

    failedLogin = () => {
        this.setState({
            failedLoginSeen: true
        }, () => console.log(this.state.failedLoginSeen))
        axios.get(this.props.host + 'api/users/logout')
        .then(async (response, error) => {
            this.props.updateUser(null)
        })
    }
    validLogIn = () => {
        axios.get(this.props.host + 'api/users/login/' + this.props._id)
        .then(async (response) => {
            axios.get(this.props.host + 'api/users/session', {params :{//hmm
                want : ["_id", "username", "admin", "fullName", "email", "profilePic"]
              }}).then( async (response) => {
                  console.log(response.data)
                  this.props.updateCurrentUser(response.data)
              })
        })
        
    }
    render() {
        const {username, password, recieveInput, valid, routeTo} = this.props
        return(
            <div id='Login' className="tabcontent">
                <br/>
                <br/>
                <h2>Login</h2>
                Username: <br/>
                <TextField id="LoginUsername" label="Username" name="username" placeholder="Username" value={username} onInput={recieveInput}></TextField><br/>
                Password: <br/>
                <TextField id="LoginPassword" label="Password" name="password" placeholder="Password" value={password} onInput={recieveInput}></TextField><br/><br/>

                    {valid ? 
                    // <Link to="/recipes">Log In</Link>
                    <Button to={routeTo} onClick={this.validLogIn} component={Link} variant="contained">Log In</Button>: 
                    <Button variant="contained"
                            onClick={this.failedLogin}>
                                Log In
                    </Button>}
                    {this.state.failedLoginSeen ? <h4 id="failedLogin">Incorrect username or password</h4> : null}
                    <Routes>
                        <Route exact path="/recipes" element={<RecipeBrowser />}/>
                        <Route exact path="/admin" element={<AdminPage />}/>
                    </Routes>
            </div>
        )
    }
}

export default Login;