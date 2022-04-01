import React from 'react';
import { connect } from 'react-redux';
import styles from './Users.css';
import RecipeCardGroup from './RecipeCardGroup';
import UserProgress from './UserProgress';
import { Button } from 'reactstrap';
import axios from 'axios'; // new!!
//I would need to import these images based on the users from the backend later
import foodBanner from "./images/foodBanner.jpeg";

class Users extends React.Component {
    constructor(props) {
        super(props);
        axios.get('http://localhost:5000/api/users/session', {params :{
            want : ["_id", "username", "admin", "fullName", "email", "profilePic", "recipes"]
        }}).then( async (response) => {
            this.state.currentUser = response.data
            console.log(this.state.currentUser)
            console.log("user loaded from state ;)")
            this.forceUpdate()
        }).catch(function (error) {
            console.log("uh oh")
    })
    }
    state = {
        currentUser: {fullName: "null", username: "null", recipes : []},
        loaded: true,
        recipes: this.props.Recipes.recipes.filter((recipe) => recipe.author === this.state.currentUser._id)
    }
    componentDidUpdate() {
        // console.log("post mount:")
        // console.log(this.currentUser)
        // if(this.state.currentUser === null){
        //     this.setState({
        //         currentUser: this.currentUser,
        //         loaded: true
        //     }, () => console.log(this.state.currentUser))
        // }
      }

    render() {
        const {profilePic} = this.props
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
                <h1 id="name">{this.state.currentUser.fullName}</h1>
                <p id="username">{"@" + this.state.currentUser.username}</p>
                <UserProgress/>

                <h4 className="title">My Recipes</h4>
                <RecipeCardGroup className={styles.recipe_card_group}/>
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