import React from 'react';
import { connect } from 'react-redux';
import styles from './Users.css';
import RecipeCardGroup from './RecipeCardGroup';
import UserProgress from './UserProgress';
import { Button } from 'reactstrap';
import Popup from './Popup';
import axios from 'axios'; // new!!
//I would need to import these images based on the users from the backend later
import foodBanner from "./images/foodBanner.jpeg";

class Users extends React.Component {
    constructor(props) {
        super(props);

        axios.get('http://localhost:5000/api/users/session', {params :{
            want : ["_id", "username", "admin", "fullName", "email", "profilePic", "recipes", "bookmarked"]
        }}).then( async (response) => {
            this.state.currentUser = response.data
            // console.log(this.state.currentUser)
            console.log("user loaded from state ;)")
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


    editProfile() {
        this.setState({
            popup: !this.state.popup
        })
        if(this.state.popup === true){
            window.location.reload(false);
        }
    }


    render() {
        const {profilePic} = this.props
        console.log("start of render:")
        if(this.state.currentUser.fullName !== ""){

            return(
                <div id='container'>
                    {this.state.popup ? <Popup toggle={this.editProfile.bind(this)} currentUser={this.state.currentUser}/> : null}
                    <Button 
                        id="editProfileButton"
                        color="success"
                        onClick={this.editProfile.bind(this)}
                    >
                        Edit Profile
                    </Button>
                    <div id="circle">
                        <img id="profilePic" src={this.state.currentUser.profilePic}/>
                    </div>
                    <img id="foodBanner" src={foodBanner}/>
                    {/** The name, username will depend on info from backend per user */}
                    <h1 id="name">{this.state.currentUser.fullName}</h1>
                    <p id="username">{"@" + this.state.currentUser.username}</p>
                    <UserProgress/>
    
                    {this.state.currentUser.recipes.length !== 0 ? <h4 className="title">My Recipes</h4> : null}
                    {RecipeCardGroup(this.state.currentUser.recipes)}
                    <br/>

                    {this.state.currentUser.bookmarked.length !== 0 ? <h4 className="title">Bookmarked Recipes</h4> : null}
                    {RecipeCardGroup(this.state.currentUser.bookmarked)}
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

const mapStateToProps = state => {
    return {
      Recipes: state.Recipes,
    }
  }

export default connect(mapStateToProps, null)(Users);