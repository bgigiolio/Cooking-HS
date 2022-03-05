import React from 'react';
import styles from "../styles/Landing.module.css";
import {Card, CardImg, Button} from 'reactstrap';
import { Link } from 'react-router-dom';

class Landing extends React.Component {
    render() {
        return(
            <div className={styles.landingContainer}>
                <div className={styles.welcomeText}>
                    Welcome to
                </div>
                <div className={styles.appName}>
                    CookingHS
                </div>
                <span className={styles.landingButtons}>
                    <Link to={"/recipes"}>
                    <Button className={styles.landingButton}>Let's get Cooking!</Button>
                    </Link>
                   
                </span>

            </div>
        )
    }
}

export default Landing;