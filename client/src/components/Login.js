import React from 'react';
import LoginMain from './Login/LoginMain';
import styles from './Admin/Admin.module.css';

class Login extends React.Component {
    render() {
        return(
            <div className={styles.LoginContainer}>
                <LoginMain/>
            </div>
        )
    }
}

export default Login;