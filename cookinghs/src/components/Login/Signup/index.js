import React from 'react';
import './styles.css';

class Signup extends React.Component {
    render() {
        return(
            <div id='Signup' className="tabcontent">
                <h2>New user? Sign up!</h2>
                <form>
                    <label>Full Name</label><br/>
                    <input type="text" id="SignupName" placeholder="Name"></input><br/>
                    <label>Username</label><br/>
                    <input type="text" id="SignupUsername" placeholder="Username"></input><br/>
                    <label>Password</label><br/>
                    <input type="text" id="SignupPassword" placeholder="Password"></input><br/>
                    <label>Confirm Password</label><br/>
                    <input type="text" id="SignupPasswordConfirm" placeholder="Re-enter Password"></input><br/>
                    <label>Email</label><br/>
                    <input type="text" id="SignupEmail" placeholder="Email"></input><br/><br/>
                    <input type="submit" value="Lets Start Cooking!"></input>
                </form>
            </div>
        )
    }
}

export default Signup;