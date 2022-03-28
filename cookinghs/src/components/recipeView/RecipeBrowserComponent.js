import React from 'react';
import { useParams } from 'react-router-dom';
import {Loading} from '../LoadingComponent';
import RecipeSingle from './RecipeSingleComponent';
import RecipeLanding from './RecipeLandingComponent';
import '../../styles/recipeview.css';
import '../../styles/colorpalette.css';

function RecipeBrowser(props) {
    const { id } = useParams();
    if (props.recipes.isLoading) {
        return(
            <div className='container relativeContainer' id='recipeContainer'>
                <Loading />
            </div>
        )
    }

    else if (id) {
        const recipes = props.recipes.recipes
        let chosenRecipe = recipes.filter(recipe => recipe._id === id)[0]

        return(
            <div className='container relativeContainer' id='recipeContainer'>
                {chosenRecipe ? <RecipeSingle recipes={recipes} chosenRecipe={chosenRecipe}/> : <p>404 Recipe Not Found</p>}
            </div>
        )
    }

    else {
        const recipes = props.recipes.recipes
        return(
            <div className='container relativeContainer' id='recipeContainer'>
                <RecipeLanding recipes={recipes}/>
            </div>
        )
    }
    
}

export default RecipeBrowser;
