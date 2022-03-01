import React from 'react';
import styles from "../Admin/Admin.module.css";
import RecipeCardGroup from '../Admin/RecipeCardGroup';
import { Progress } from 'reactstrap';
import Profile_Pic from "./images/Profile_Pic.png";

class Users extends React.Component {
    render() {
        return(
            <div className='container'>
                Search Bar <br/>
                <img id="Profile_Pic" src={Profile_Pic}/>
                <h1 id="name">Ali Syed</h1>
                <h2 id="username">GoodMorningA1i</h2>
                <Progress id="progress_bar"
                    value={50}
                />
                <h4 className={styles.h4}>Recipes</h4>
                <RecipeCardGroup className={styles.recipe_card_group}/>
            </div>
        )
    }
}

export default Users;