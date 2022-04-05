import {Input, Button} from 'reactstrap'
import React from 'react';
import './styles.css';
import axios from 'axios'; // new!!
import { Link, useParams} from 'react-router-dom';
import { Navigate } from 'react-router';
import { baseUrl } from '../../../shared/baseUrl';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.handleKey = this.handleKey.bind(this)
        this.validLogIn = this.validLogIn.bind(this)
        this.failedLogin = this.failedLogin.bind(this)
    }
    state = {
        failedLoginSeen: false,
        _id: "",
        host: "",
        redirect: false
    }

    failedLogin = () => {
        console.log(this.props)
        this.setState({
            failedLoginSeen: true
        }, () => console.log(this.state.failedLoginSeen))
        axios.get(this.props.host + 'api/users/logout')
        .then(async (response, error) => {
            this.props.updateCurrentUser(null)
        })
    }
    validLogIn = () => {
        axios.get(baseUrl + 'api/users/login/' + this.props._id)
        .then(async (response) => {
            axios.get(this.props.host + 'api/users/session', {params :{//hmm
                want : ["_id", "username", "admin", "fullName", "email", "profilePic"]
              }}).then( async (response) => {
                  this.props.updateCurrentUser(response.data)
                  this.setState({
                    redirect : true
                }, () => console.log("redirecting"))
              })
        })
        
    }
    handleKey = (e) => {
        if (e.keyCode === 13) {
            console.log("pressed")
            if(this.props.valid){
                this.validLogIn();
            }else{
                this.failedLogin();
            }
          }
    }
    render() {
        const {username, password, recieveInput, valid, routeTo} = this.props
        if(this.state.redirect){
            return(
            <Navigate to={routeTo}/>
            )
        }
        return(
            <div id='Login' className="tabcontent">
                <br/>
                <br/>
                <h2>Login</h2>
                Username
                <Input id="LoginUsername" label="Username" name="username" placeholder="Username" value={username} onInput={recieveInput} onKeyUp={this.handleKey}></Input><br/>
                Password
                <Input type="password" id="LoginPassword" label="Password" name="password" placeholder="Password" value={password} onInput={recieveInput} onKeyUp={this.handleKey}></Input><br/>

                    {valid ? 
                    // <Link to="/recipes">Log In</Link>
                    <Button id="log" to={routeTo} onClick={this.validLogIn} component={Link} variant="contained">Log In</Button>: 
                    <Button id="log" variant="contained"
                            onClick={this.failedLogin}>
                                Log In
                    </Button>}
                    {this.state.failedLoginSeen ? <h4 id="failedLogin">Incorrect username or password</h4> : null}
            </div>
        )
    }
}

export default (props) => (
    <Login
        {...props}
        params={useParams()}
    />
);