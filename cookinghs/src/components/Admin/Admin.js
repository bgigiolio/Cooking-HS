import React from 'react';
import UserCardGroup from './UserCardGroup';
import styles from "./Admin.module.css";
import RecipeCardGroup from './RecipeCardGroup';
import Flags from "./Flags";

class Admin extends React.Component {
    render() {
        return(
            <div className={styles.container}>
                <h3 className={styles.h3}>Admin Profile</h3>
                <h4 className={styles.h4}>Users</h4>
                <UserCardGroup className={styles.user_card_group}/>
                <h4 className={styles.h4}>Recipes</h4>
                <RecipeCardGroup className={styles.recipe_card_group}/>
                <h4 className={styles.h4}>Flags</h4>
                <Flags/>
            </div>
        )
    }
}

export default Admin;