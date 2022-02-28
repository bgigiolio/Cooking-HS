import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { RECIPES } from '../../shared/RecipeList';
import RecipeSingle from './RecipeSingleComponent';
import RecipeLanding from './RecipeLandingComponent';
import '../../styles/recipeview.css';
import '../../styles/colorpalette.css';


function RecipeBrowser() {
    const { id } = useParams();
    let [recipes] = useState(RECIPES);

    return(
        <div className='container relativeContainer' id='recipeContainer'>
            {recipes[id] ? <RecipeSingle id={id}/> : <RecipeLanding/>}
        </div>
    )
}

export default RecipeBrowser;
