import React from 'react';
import { useParams } from 'react-router-dom';
import {Loading} from '../LoadingComponent';
import RecipeSingle from './RecipeSingleComponent';
import RecipeLanding from './RecipeLandingComponent';
import NotFound from '../NotFoundComponent';
import '../../styles/recipeview.css';
import '../../styles/colorpalette.css';
import axios from 'axios';
import { baseUrl } from '../../shared/baseUrl';

function RecipeBrowser(props) {
    const { id } = useParams();
    if (props.recipes.isLoading || props.users.isLoading) {
        return(
            <div className='container relativeContainer' id='recipeContainer'>
                <Loading />
            </div>
        )
    }

    else if (id) {
        const recipes = props.recipes.recipes
        const chosenRecipe = recipes.filter(recipe => recipe._id === id)[0]
        let loggedIn = false;
        let bookmarked = false;
        if (props.currentUser !== null && props.currentUser.hasOwnProperty("_id")){
            loggedIn = true;
            axios.get(baseUrl + "api/users/session", {params: {want : ["bookmarked"]}})
            .then((response) => {
                if(response.data.bookmarked.filter(entry => entry === chosenRecipe._id).length != 0){
                    bookmarked = true
                }
            })
        }

        return(
            <div className='container relativeContainer' id='recipeContainer'>
                {chosenRecipe ? <RecipeSingle loggedIn={loggedIn} bookmarked={bookmarked} currentUser={props.currentUser} users={props.users.users} recipes={recipes} chosenRecipe={chosenRecipe}/> : <NotFound/>}
            </div>
        )
    }

    else {
        const recipes = props.recipes.recipes
        return(
            <div className='container relativeContainer' id='recipeContainer'>
                <RecipeLanding recipes={recipes} users={props.users.users} comments={props.comments.comments}/>

            </div>
        )
    }
    
}

export default RecipeBrowser;
