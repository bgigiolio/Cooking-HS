import React, { useState} from 'react';
import { useLocation } from 'react-router-dom';
import RecipeForm from './RecipeFormComponent';

import '../../styles/recipeform.css';

function CreateRecipe() {
    const location=useLocation()
    const [recipe, setRecipe] = useState(() => 
        location.state ? location.state.chosenRecipe :
            {
                title: '',
                ingredients: [
                    {
                        name: '',
                        quantity: '',
                        unit: ''
                    },
                    {
                        name: '',
                        quantity: '',
                        unit: ''
                    }
                ],
                steps: [
                    '',
                    '',
                    ''
                ],
                course: 'Main',
                cuisine: '',
                preptime: '',
                cooktime: '',
                servings: '',
                difficulty: 5,                                              
                image: ''
            }
    )

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

    const newRecipe = () => {
        return(
            <>
                <h1> <i id="formIcon" className="fa-regular fa-square-plus"></i> Add a Recipe</h1>
                <p>Uploading personal recipes is easy! Add yours to your favorites, share with friends, family, and the CookingHS community.</p>
            </>
        )
    }

    const forkRecipe = () => {
        return(
            <>
                <h1> <i id="formIcon" className="fa-solid fa-code-fork"></i> Fork a Recipe</h1>
                <p>Forking a recipe is easy! Share your own unique spin on a recipe with friends, family, and the CookingHS community.</p>
            </>
        )
    }
    
    return(
        <div className='container' id='formContainer'>
            {location.state ? forkRecipe() : newRecipe()}
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

export default CreateRecipe;