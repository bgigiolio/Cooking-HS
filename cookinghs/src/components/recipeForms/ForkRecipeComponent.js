import React, { useState} from 'react';
import { useLocation } from 'react-router-dom';
import RecipeForm from './RecipeFormComponent';

import '../../styles/recipeform.css';

function ForkRecipe() {
    const location=useLocation()
    const [recipe, setRecipe] = useState(location.state.chosenRecipe)

    const handleInputChange = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setRecipe({
            ...recipe,
            [name] : value
        }); 
    }

    const handleIngredientChange = (index, e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        let ingredients = [...recipe.ingredients]
        let ingredient = {
            ...recipe.ingredients[index],
            [name] : value
        }
        ingredients[index] = ingredient;
        setRecipe({
            ...recipe,
            ingredients: ingredients
        })
    }

    const handleStepChange = (index, e) => {
        const target = e.target;
        const value = target.value;
        let steps = [...recipe.steps];
        steps[index] = value;
        setRecipe({
            ...recipe,
            steps: steps
        })
    }

    const removeIngredient = (index, e) => {
        let newIngredients = recipe.ingredients;
        newIngredients.splice(index, 1);
        setRecipe({
            ...recipe,
            ingredients: newIngredients
        })
    }

    const addIngredient = (e) => {
        setRecipe({
            ...recipe,
            ingredients: [
                ...recipe.ingredients,
                {
                    name: '',
                    quantity: '',
                    unit: ''
                }
            ]
        })
    }

    const removeStep = (index, e) => {
        let newSteps = recipe.steps;
        newSteps.splice(index, 1);
        setRecipe({
            ...recipe,
            steps: newSteps
        })
    }

    const addStep = (e) => {
        setRecipe({
            ...recipe,
            steps: [
                ...recipe.steps,
                ''
            ]
        })
    }

    const checkForm = function() {

    }

    const handleSubmit = (e) => {
        console.log(recipe);
        checkForm();
        e.preventDefault();
    }
    
    return(
        <div className='container' id='formContainer'>
            <h1> <i id="formIcon" class="fa-solid fa-code-fork"></i> Fork a Recipe</h1>
            <p>Forking a recipe is easy! Share your own unique spin on a recipe with friends, family, and the CookingHS community.</p>
            <RecipeForm 
                {...recipe} 
                handleSubmit = {handleSubmit}
                handleInputChange = {handleInputChange}
                handleIngredientChange = {handleIngredientChange}
                handleStepChange = {handleStepChange}
                addIngredient = {addIngredient}
                removeIngredient = {removeIngredient}
                addStep = {addStep}
                removeStep = {removeStep}
            />
        </div>
    )
}

export default ForkRecipe;