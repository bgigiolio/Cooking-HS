import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Fraction } from 'fractional'; 
import { connect } from 'react-redux';
import { postRecipe, putRecipe } from '../../redux/recipePage/recipe-actions';

import RecipeForm from './RecipeFormComponent';

import '../../styles/recipeform.css';

const AUTHOR = 'admin'

function WriteRecipe(props) {
    const chosenRecipe = props.chosenRecipe
    const [recipe, setRecipe] = useState(() => 
        {
        switch (props.flag) {
            case "fork":
                return {
                    ...chosenRecipe, 
                    parent: chosenRecipe._id,
                    author: AUTHOR,
                    image: ''
                }
            case "edit":
                return {
                    ...chosenRecipe,
                }
            default:
                return {
                    author: AUTHOR,
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
                };
            }
        })
    const handleInputChange = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        if (name === "difficulty") {
            setRecipe({
                ...recipe,
                [name] : Number(value)
            }); 
        }
        else {
            setRecipe({
                ...recipe,
                [name] : value
            }); 
        }
        
    }

    const handleIngredientChange = (index, e) => {
        const target = e.target;
        let value = target.value;
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

    const parseForm = function() {
        const checkedRecipe = JSON.parse(JSON.stringify(recipe))
        //remove empty ingredients
        checkedRecipe.ingredients = checkedRecipe.ingredients.filter((ingredient) => ingredient.name !== '')
        //convert ingredient quantities to float
        checkedRecipe.ingredients.forEach(ingredient => {
            if (ingredient.quantity !== null) {
                ingredient.quantity = new Fraction(ingredient.quantity)
                ingredient.quantity = ingredient.quantity.numerator/ingredient.quantity.denominator
            }
            else {
                ingredient.quantity = ''
            }
        })
        //remove empty steps
        checkedRecipe.steps = checkedRecipe.steps.filter((step) => step.trim() !== '')

        return checkedRecipe
    }

    const checkForm = (recipe) => {
        console.log(recipe)
        //check required fields: title, ingredient0, step0
        if (recipe.title === '') {return false}
        recipe.ingredients.map((ingredient) => {
            if (ingredient.name === '') {return false}
            if (ingredient.quantity !== '' && ingredient.quantity === NaN) {console.log('bad quantity'); return false}
        })
        recipe.steps.map((step) => {if (step === ''){return false}})
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const recipe = parseForm()
        const valid = checkForm(recipe)
        if (valid) {
            if (props.flag === "fork" || props.flag === "new") {
                props.postRecipe(recipe.author, recipe.parent, recipe.title, recipe.description, recipe.ingredients, recipe.steps, 5, recipe.course, recipe.cuisine, recipe.preptime, recipe.cooktime, recipe.servings, recipe.image);
                handleRedirect()
            }
            else if (props.flag === "edit") {
                props.putRecipe(recipe._id, recipe.author, recipe.parent, recipe.title, recipe.description, recipe.ingredients, recipe.steps, recipe.difficulty, recipe.course, recipe.cuisine, recipe.preptime, recipe.cooktime, recipe.servings, recipe.image);
                handleRedirect()
            }
        }
        else {
            alert("Please double check your recipe!")
        }
    }

    let navigate = useNavigate()
    const handleRedirect = () => {
        let path = '/recipes'; 
        navigate(path);
    }

    const forkRecipe = () => {
        return(
            <>
                <h1> <i id="formIcon" className="fa-solid fa-code-fork"></i> Fork a Recipe</h1>
                <p>Forking a recipe is easy! Share your own unique spin on a recipe with friends, family, and the CookingHS community.</p>
            </>
        )
    }

    const editRecipe = () => {
        return(
            <>
                <h1> <i id="formIcon" className="fa-regular fa-square-plus"></i> Edit a Recipe</h1>
                <p>Uploading personal recipes is easy! Add yours to your favorites, share with friends, family, and the CookingHS community.</p>
            </>
        )
    }

    const newRecipe = () => {
        return(
            <>
                <h1> <i id="formIcon" className="fa-regular fa-square-plus"></i> Add a Recipe</h1>
                <p>Uploading personal recipes is easy! Add yours to your favorites, share with friends, family, and the CookingHS community.</p>
            </>
        )
    }
    
    return(
        <div className='container' id='formContainer'>
            {props.flag === "fork" ? forkRecipe() : props.flag === "edit" ? editRecipe() : newRecipe()}
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

const mapDispatchtoProps = (dispatch) => {
    return{
        postRecipe: (author, parent, title, description, ingredients, steps, difficulty, course, cuisine, preptime, cooktime, servings, image) => {dispatch(postRecipe(author, parent, title, description, ingredients, steps, difficulty, course, cuisine, preptime, cooktime, servings, image))},
        putRecipe: (_id, author, parent, title, description, ingredients, steps, difficulty, course, cuisine, preptime, cooktime, servings, image) => {dispatch(putRecipe(_id, author, parent, title, description, ingredients, steps, difficulty, course, cuisine, preptime, cooktime, servings, image))},
    }
}


export default connect(null, mapDispatchtoProps)(WriteRecipe);
