import React from 'react';
import { connect } from 'react-redux';
import styles from './Users.css';
import RecipeCardGroup from './RecipeCardGroup';
import UserProgress from './UserProgress';
import { Button, Container } from 'reactstrap';
import Popup from './Popup';
import { baseUrl } from '../../shared/baseUrl';
import axios from 'axios'; // new!!
//I would need to import these images based on the users from the backend later
import foodBanner from "./images/foodBanner.jpeg";

class Users extends React.Component {
    constructor(props) {
        super(props);

        axios.get(baseUrl + 'api/users/session', {params :{
            want : ["_id", "username", "admin", "fullName", "email", "profilePic", "recipes", "bookmarked"]
        }}).then( async (response) => {
            this.state.currentUser = response.data
            console.log("user loaded from state")
            this.forceUpdate()
        }).catch(function (error) {
            console.log(error)
    })
    }
    state = {
        currentUser: {fullName: "", username: "null", recipes : [], bookmarked : [], profilePic : this.props.profilePic},
        loaded: true,
        popup: false
    }


    editProfile() {
        this.setState({
            popup: !this.state.popup
        })
        if(this.state.popup === true){
            window.location.reload(false);
        }
    }


    render() {
        const currentUserRecipes = this.props.Recipes.recipes.filter((recipe) => recipe.author === this.state.currentUser._id)
        console.log(currentUserRecipes)
        const {profilePic} = this.props

        return(
            <div id='container'>
                <div id="circle">
                    <img id="profilePic" src={this.state.currentUser.profilePic}/>
                </div>
                <img id="foodBanner" src={foodBanner}/>
                {/** The name, username will depend on info from backend per user */}
                <h1 id="name">{this.state.currentUser.fullName}</h1>
                <p id="username">{"@" + this.state.currentUser.username}</p>
                <UserProgress recipes = {this.state.currentUser.recipes}/>

                {this.state.currentUser.recipes.length !== 0 ? <h4 className="title">{this.state.currentUser.fullName + "'s Recipes"}</h4> : null}
                <Container>
                    <RecipeCardGroup isLoading={this.props.Recipes.isLoading} recipes={currentUserRecipes} del={false}/>
                </Container>
                
                <br/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      Recipes: state.Recipes,
    }
  }

export default connect(mapStateToProps, null)(Users);