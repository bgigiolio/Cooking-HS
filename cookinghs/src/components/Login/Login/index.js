import React from 'react';

class Login extends React.Component {
    render() {
        const {username, password, recieveInput} = this.props
        return(
            <div id='Login' className="tabcontent">
                <br/>
                <br/>
                <h2>Login</h2>
                <form>
                    <label>Username</label> <br/>
                    <input type="text" id="LoginUsername" placeholder="Username" value={username} onChange={recieveInput}></input><br/>
                    <label>Password</label><br/>
                    <input type="text" id="LoginPassword" placeholder="Password" value={password} onChange={recieveInput}></input><br/>
                    <input type="submit" value="Lets Get Cooking!"></input>
                </form>
            </div>
        )
    }
}

export default Login;