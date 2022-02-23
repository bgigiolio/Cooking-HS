import React, { useState } from 'react';
import { List, ListGroup } from 'reactstrap';
import { Fraction } from 'fractional';
import { useParams } from 'react-router-dom';
import { RECIPES } from '../shared/RecipeList';


function Recipes() {
    const { id } = useParams();
    let [recipes, setRecipes] = useState(RECIPES)
    const chosenRecipe = recipes[id] ? recipes[id] : 'Recipe';
    
    const recipeView = function(recipe) {
        const ingredientView = recipe.ingredients.map((ingredient) => {
            let amount;
            if (ingredient[1]) {
                if (ingredient[1]%1 === 0){
                    amount = new Fraction(ingredient[1]).toString();
                }
                else if (ingredient[1]*3%1 === 0) {
                    amount = (ingredient[1] * 3).toString();
                    amount = amount.concat('/3');
                }
                else {
                    amount = new Fraction(ingredient[1]).toString();
                }
                amount = amount.concat(' ');
            }
                
            return (
                <li>
                    {amount} {ingredient[2] ? ingredient[2] + " " + ingredient[0].toLowerCase() : ingredient[0].toLowerCase()}
                </li>
            );
        });
    
        const stepsView = recipe.steps.map((step) => {
            return (
                <li>
                    {step}
                </li>
            )
        });

        return(
            <div>
                <h1>{recipe.name}</h1>
                <h2>Ingredients</h2>
                <List type='unstyled'>
                    {ingredientView}
                </List>
                <h2>Steps</h2>
                <ListGroup numbered>
                    {stepsView}
                </ListGroup>
            </div>
        )
    };

    return(
        <div className='container'>
            {recipes[id] ? recipeView(chosenRecipe) : 'No Recipe Found'}
        </div>
    )
}

export default Recipes;
