import React from 'react';
import { Button, TextField } from '@mui/material';
import './styles.css';

class Signup extends React.Component {
    render() {
        const {sUsername, sPassword, sName, sValid, password2, sEmail, recieveInput, validSignup} = this.props
        return(
            <div id='Signup' className="tabcontent">
                <h2>New user? Sign up!</h2>
                <form>
                    {/* Full Name<br/> */}
                    <TextField id="sName" label="Full Name" name="sName" placeholder="Name" value={sName} onInput={recieveInput}></TextField><br/>
                    {/* Username<br/> */}
                    <TextField id="sUsername" label="Username" name="sUsername" placeholder="Username" value={sUsername} onInput={recieveInput}></TextField><br/>
                    {/* Password<br/> */}
                    <TextField type="password" id="sPassword" label="Password" name="sPassword" placeholder="Password" value={sPassword} onInput={recieveInput}></TextField><br/>
                    {/* Re-enter Password<br/> */}
                    <TextField type="password" id="password2" label="Re-enter" name="password2" placeholder="Password" value={password2} onInput={recieveInput}></TextField><br/>
                    {/* Email<br/> */}
                    <TextField id="sEmail" label="Email" name="sEmail" placeholder="Email" value={sEmail} onInput={recieveInput}></TextField><br/><br/>
                    <Button variant="contained"
                            onClick={validSignup}>
                            Sign Up
                    </Button>
                    {sValid === -1 ? <h4 id="failedLogin"> Username can not be empty </h4> : null}
                    {sValid === -2 ? <h4 id="failedLogin"> Passwords do not match </h4> : null}
                    {sValid === 1 ? <h4 id="successLogin"> Account successfully created,<br></br> please log in </h4> : null}
                    {sValid === -3 ? <h4 id="failedLogin"> Please enter a valid password </h4> : null}
                    {sValid === -4 ? <h4 id="failedLogin"> Please enter a valid email </h4> : null}
                    {sValid === -5 ? <h4 id="failedLogin"> Please enter a valid name </h4> : null}
                    {sValid === -6 ? <h4 id="failedLogin"> Username is already taken </h4> : null}
                </form>
            </div>
        )
    }
}

export default Signup;