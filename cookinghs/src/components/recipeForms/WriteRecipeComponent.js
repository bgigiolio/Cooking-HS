import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Fraction } from 'fractional'; 
import { connect } from 'react-redux';
import { postRecipe, putRecipe } from '../../redux/recipePage/recipe-actions';

import RecipeForm from './RecipeFormComponent';

import '../../styles/recipeform.css';

function WriteRecipe(props) {
    const chosenRecipe = props.chosenRecipe
    const AUTHOR = props.user._id
    const [recipe, setRecipe] = useState(() => 
        {
        switch (props.flag) {
            case "fork":
                return {
                    ...chosenRecipe, 
                    parent: chosenRecipe._id,
                    author: AUTHOR,
                    tempimage: 'https://res.cloudinary.com/yongdk1/image/upload/v1648748246/recipe-add-photo_ortqgg.png',
                    imagefile: null
                }
            case "edit":
                return {
                    ...chosenRecipe,
                    tempimage: chosenRecipe.image,
                    imagefile: null
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
                        {step: ''},
                        {step: ''},
                        {step: ''}
                    ],
                    course: 'Main',
                    cuisine: '',
                    preptime: '',
                    cooktime: '',
                    servings: '',
                    difficulty: 5,
                    tempimage: 'https://res.cloudinary.com/yongdk1/image/upload/v1648748246/recipe-add-photo_ortqgg.png',
                    imagefile: null
                };
            }
        }
    )

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

    const handleImageChange = e => {
        const target = e.target;
        const name = target.name;
        const file = target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setRecipe({
                ...recipe,
                imagefile: reader.result
                }
            )
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
        steps[index] = {
            ...steps[index],
            step: value
        };
        setRecipe({
            ...recipe,
            steps: steps
        })
    }

    const handleStepImage = (index, e) => {
        const target = e.target;
        const file = target.files[0];
        let steps = [...recipe.steps];
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            steps[index] = {
                ...steps[index],
                stepimage: reader.result
            }
            setRecipe({
                ...recipe,
                steps: steps
            })
        }
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
            ingredient.name = ingredient.name.toLowerCase()
            if (ingredient.unit !== "" && ingredient.unit !== undefined) {
                console.log(ingredient.name)
                ingredient.unit = ingredient.unit.toLowerCase()
            }
        })
        //remove empty steps
        checkedRecipe.steps = checkedRecipe.steps.filter((step) => step.step.trim() !== "");

        return checkedRecipe
    }

    const checkForm = (recipe) => {
        // console.log(recipe)
        //check required fields: title, ingredient0, step0
        if (recipe.title === '') {return false}
        recipe.ingredients.map((ingredient) => {
            if (ingredient.name === '') {return false}
            if (ingredient.quantity !== '' && ingredient.quantity === NaN) {console.log('bad quantity'); return false}
        })
        recipe.steps.map((step) => {if (step === ''){return false}})
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const recipe = parseForm()
        const valid = checkForm(recipe)
        if (valid) {
            if (props.flag === "fork" || props.flag === "new") {
                props.postRecipe(recipe.author, recipe.parent, recipe.title, recipe.description, recipe.ingredients, recipe.steps, recipe.difficulty, recipe.course, recipe.cuisine, recipe.preptime, recipe.cooktime, recipe.servings, recipe.image, recipe.imagefile)
                // handleRedirect()
            }
            else if (props.flag === "edit") {
                props.putRecipe(recipe._id, recipe.author, recipe.parent, recipe.title, recipe.description, recipe.ingredients, recipe.steps, recipe.difficulty, recipe.course, recipe.cuisine, recipe.preptime, recipe.cooktime, recipe.servings, recipe.image, recipe.imagefile)
                // handleRedirect()
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
            {props.flag === "edit" ? AUTHOR === chosenRecipe.author ? <RecipeForm 
                {...recipe} 
                handleSubmit = {handleSubmit}
                handleInputChange = {handleInputChange}
                handleImageChange = {handleImageChange}
                handleIngredientChange = {handleIngredientChange}
                handleStepChange = {handleStepChange}
                handleStepImage = {handleStepImage}
                addIngredient = {addIngredient}
                removeIngredient = {removeIngredient}
                addStep = {addStep}
                removeStep = {removeStep}
            /> : <h2>You are not authorised to make edits to this recipe</h2> : <RecipeForm 
            {...recipe} 
            handleSubmit = {handleSubmit}
            handleInputChange = {handleInputChange}
            handleImageChange = {handleImageChange}
            handleIngredientChange = {handleIngredientChange}
            handleStepChange = {handleStepChange}
            handleStepImage = {handleStepImage}
            addIngredient = {addIngredient}
            removeIngredient = {removeIngredient}
            addStep = {addStep}
            removeStep = {removeStep}
        />}
            
        </div>
    )
}

const mapDispatchtoProps = (dispatch) => {
    return{
        postRecipe: (author, parent, title, description, ingredients, steps, difficulty, course, cuisine, preptime, cooktime, servings, image, imagefile) => {dispatch(postRecipe(author, parent, title, description, ingredients, steps, difficulty, course, cuisine, preptime, cooktime, servings, image, imagefile))},
        putRecipe: (_id, author, parent, title, description, ingredients, steps, difficulty, course, cuisine, preptime, cooktime, servings, image, imagefile) => {dispatch(putRecipe(_id, author, parent, title, description, ingredients, steps, difficulty, course, cuisine, preptime, cooktime, servings, image, imagefile))},
    }
}


export default connect(null, mapDispatchtoProps)(WriteRecipe);

