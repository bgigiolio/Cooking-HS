import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { RECIPES } from '../../shared/NewRecipeList';
import RecipeSingle from './RecipeSingleComponent';
import RecipeLanding from './RecipeLandingComponent';
import '../../styles/recipeview.css';
import '../../styles/colorpalette.css';


function RecipeBrowser(props) {
    const { id } = useParams();
    const [recipes] = useState(RECIPES)

    let chosenRecipe = null
    if (id) { 
        chosenRecipe = recipes.filter(recipe => recipe._id === id)[0]
    }

    return(
        <div className='container relativeContainer' id='recipeContainer'>
            {chosenRecipe ? <RecipeSingle recipes = {recipes} recipe = {chosenRecipe}/> : <RecipeLanding/>}
        </div>
    )
}

export default RecipeBrowser;
