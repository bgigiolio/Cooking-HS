import React from 'react';
import styles from './Users.css';
import RecipeCardGroup from './RecipeCardGroup';
import { Progress, Button } from 'reactstrap';
//I would need to import these images based on the users from the backend later
import profilePic from "./images/profilePic.png";
import foodBanner from "./images/foodBanner.jpeg";

class Users extends React.Component {
    render() {
        return(
            <div id='container'>
                <Button 
                    id="editProfileButton"
                    color="success"
                >
                    Edit Profile
                </Button>
                <img id="profilePic" src={profilePic}/>
                <img id="foodBanner" src={foodBanner}/>
                {/** The name, username, and progressbar will depend on info from backend per user */}
                <h1 id="name">Ali Syed</h1>
                <p id="username">@GoodMorningA1i</p>
                <Progress id="progressBar"
                    value={50}
                />
                <p id="skillLevel"><span className="bold">Skill Level:</span> Intermediate</p>

                <h4>Recipes</h4>
                <RecipeCardGroup className={styles.recipe_card_group}/>
            </div>
        )
    }
}

export default Users;