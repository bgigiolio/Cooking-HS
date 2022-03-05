import React from 'react';
import styles from "../Admin/Admin.module.css";
import './Users.css';
import RecipeCardGroup from '../Admin/RecipeCardGroup';
import { Card, CardBody, CardImg, CardTitle, CardText, Progress, Button } from 'reactstrap';
import profilePic from "./images/profilePic.png";
import foodBanner from "./images/foodBanner.jpeg";

class Users extends React.Component {
    render() {
        return(
            <div id='container'>
                <img id="profilePic" src={profilePic}/>
                <img id="foodBanner" src={foodBanner}/>
                <h1 id="name">Ali Syed</h1>
                <p id="username">@GoodMorningA1i</p>
                <Progress id="progressBar"
                    value={50}
                />
                <p id="skillLevel">Intermediate</p>

                {/* <Card id="infoCard">
                    <CardBody>
                        <CardTitle>
                            <h1 id="name">Ali Syed</h1>
                        </CardTitle>
                        <CardText>
                            <h2 id="username">@GoodMorningA1i</h2>
                        </CardText>
                        <Progress id="progressBar"
                            value={50}
                        />
                    </CardBody>
                </Card> */}


                <h4 className={styles.h4}>Recipes</h4>
                <RecipeCardGroup className={styles.recipe_card_group}/>
            </div>
        )
    }
}

export default Users;