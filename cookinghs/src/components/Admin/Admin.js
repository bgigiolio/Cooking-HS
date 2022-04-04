import React from 'react';
import UserCardGroup from './UserCardGroup';
import styles from "./Admin.module.css";
import RecipeCardGroup from './RecipeCardGroup';
import Flags from "./Flags";
import { baseUrl } from '../../shared/baseUrl';
import axios from 'axios'; // new!!
import { Button } from 'reactstrap';

class Admin extends React.Component {
    constructor(props){
        super(props);
        this.state.admin = false
        axios.get(baseUrl + 'api/users/session', {params :{
            want : ["admin"]
        }}).then( async (response) => {
            this.state.admin = response.data.admin
            console.log("user loaded from state")
            this.forceUpdate();
        }).catch(function (error) {
            console.log(error)
    })
    }
    state = {
        admin: false
    }
    adminCheck(){
        window.location.reload(false);
    }

    render() {
        if(this.state.admin){
            return(
                <div className={styles.AdminContainer}>
                    <h3 className={styles.h3}>Admin Profile</h3>
                    <h4 className={styles.h4}>Users</h4>
                    <UserCardGroup className={styles.user_card_group}/>
                    <h4 className={styles.h4}>Recipes</h4>
                    <RecipeCardGroup className={styles.recipe_card_group}/>
                    <h4 className={styles.h4}>Flags</h4>
                    <Flags/>
                </div>
            )
        }else{
            return(
            <div className={styles.AdminContainer}>
                <h1>Only cookHS admins may access this page!</h1>
                <br/>
                <Button color="success" className={styles.refresh} onClick={this.adminCheck.bind(this)}>Verify Admin Status</Button>

            </div>
            )
        }
    }
}

export default Admin;