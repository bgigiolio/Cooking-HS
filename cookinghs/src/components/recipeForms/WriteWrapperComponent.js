import React from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '../LoadingComponent';
import WriteRecipe from './WriteRecipeComponent';
import '../../styles/recipeview.css';
import '../../styles/colorpalette.css';

function WriteWrapper(props) {
    const { id } = useParams()
    if (props.recipes.isLoading) {
        return(
            <div className='container relativeContainer' id='recipeContainer'>
                <Loading />
            </div>
        )
    }

    else if (id) {
        const recipes = props.recipes.recipes
        const chosenRecipe = recipes.filter(recipe => recipe._id === id)[0]
        return(
            <>
                {chosenRecipe ? <WriteRecipe flag={props.flag} chosenRecipe={chosenRecipe}/> : <p>404 Recipe Not Found</p>}
            </>
        )
    }

    else {
        return(
            <WriteRecipe flag={props.flag} chosenRecipe={null}/> 
        )
    }
    
}

export default WriteWrapper;
