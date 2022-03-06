import React from 'react';
import styles from './Users.css';
import RecipeCardGroup from './RecipeCardGroup';
import UserProgress from './UserProgress';
import { Button } from 'reactstrap';
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
                {/** The name, username will depend on info from backend per user */}
                <h1 id="name">Ali Syed</h1>
                <p id="username">@GoodMorningA1i</p>
                <UserProgress/>

                <h4 className="title">My Recipes</h4>
                <RecipeCardGroup className={styles.recipe_card_group}/>
            </div>
        )
    }
}

export default Users;