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

    else {
        const recipes = props.recipes.recipes
        return(
            <WriteRecipe flag={props.flag} recipes={recipes} id={id}/>
        )
    }
    
}

export default WriteWrapper;
