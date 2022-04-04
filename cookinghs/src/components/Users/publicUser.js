import React from 'react';
import { connect } from 'react-redux';
import styles from './Users.css';
import RecipeCardGroup from './RecipeCardGroup';
import UserProgress from './UserProgress';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // new!!
import { baseUrl } from '../../shared/baseUrl';
//I would need to import these images based on the users from the backend later
import foodBanner from "./images/foodBanner.jpeg";

class PublicUser extends React.Component {
    constructor(props) {
        super(props);
        const { id } = this.props.params;
        axios.get(baseUrl + 'api/users/' + id)
        .then( async (response) => {
            this.state.currentUser = response.data
            // console.log(this.state.currentUser)
            this.forceUpdate()
        }).catch(function (error) {
            console.log("uh oh")
    })
    }
    state = {
        currentUser: {fullName: "", username: "null", recipes : [], bookmarked : [], profilePic : this.props.profilePic},
        loaded: true,
        popup: false
        // recipes: this.props.Recipes.recipes.filter((recipe) => recipe.author === this.state.currentUser._id)
    }
    render() {
        const {profilePic} = this.props
        console.log("start of render:")
        if(this.state.currentUser.fullName !== ""){

            return(
                <div id='container'>
                    <img id="profilePic" src={this.state.currentUser.profilePic}/>
                    <img id="foodBanner" src={foodBanner}/>
                    {/** The name, username will depend on info from backend per user */}
                    <h1 id="name">{this.state.currentUser.fullName}</h1>
                    <p id="username">{"@" + this.state.currentUser.username}</p>
                    <UserProgress/>
    
                    {this.state.currentUser.recipes.length !== 0 ? <h4 className="title">{this.state.currentUser.fullName + "'s recipes"}</h4> : <h4 className="title">{this.state.currentUser.fullName + " has no recipes!"}</h4>}
                    {RecipeCardGroup(this.state.currentUser.recipes)}
                    <br/>
                </div>
            )
        }else{
            return(                
            <div id='container'>
            <h1 id="name">You are not currently logged in!</h1>
        </div>)
        }
    }
}

// const mapStateToProps = state => {
//     return {
//       Recipes: state.Recipes,
//     }
//   }

export default (props) => (
    <PublicUser
        {...props}
        params={useParams()}
    />
);