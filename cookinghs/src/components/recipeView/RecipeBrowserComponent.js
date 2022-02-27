import React, { useState } from 'react';
import { List, ListGroup, ListGroupItem, Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import { Fraction } from 'fractional';
import { useParams, Link } from 'react-router-dom';
import { RECIPES } from '../../shared/RecipeList';
import { COMMENTS } from '../../shared/RecipeComments';
import '../../styles/recipes.css';


function RecipeBrowser() {
    const { id } = useParams();
    let [recipes, setRecipes] = useState(RECIPES);
    let [comments, setComments] = useState(COMMENTS);
    const chosenRecipe = recipes[id] ? recipes[id] : null;
    const chosenComment = comments[id] ? comments[id] : null;

    const recipeCards = Object.entries(recipes).map(([key, value]) => {
        return(
            <Col lg={4} md={6}>
                <Link to={key} className="article">
                    <img src={value.image} alt={value.title} className="articleimage"></img>
                    <h4 className="articlename">{value.title}</h4>
                </Link>
                <br></br>
            </Col>
        )
    });

    const recipeLanding = function() {
        return (
            <>
                <h1 id="landingheader">All Recipes</h1>
                <Link to="/writerecipe">
                    <img src='../plus.png'
                        alt=""
                        id="newRecipeButton"
                        />
                </Link>
                <Row>
                    {recipeCards}
                </Row>
            </>
        )
    }
    

    const recipeView = function() {
        const ingredientView = chosenRecipe.ingredients.map((ingredient) => {
            let amount;
            if (ingredient.quantity) {
                if (ingredient.quantity%1 === 0){
                    amount = new Fraction(ingredient.quantity).toString();
                }
                else if (ingredient.quantity*3%1 === 0) {
                    amount = (ingredient.quantity * 3).toString();
                    amount = amount.concat('/3');
                }
                else {
                    amount = new Fraction(ingredient.quantity).toString();
                }
                amount = amount.concat(' ');
            }
                
            return (
                <li>
                    <input type="checkbox" />
                    <> </>
                    {amount} {ingredient.unit ? ingredient.unit + " " + ingredient.name.toLowerCase() : ingredient.name.toLowerCase()}
                </li>
            );
        });
    
        const stepsView = chosenRecipe.steps.map((step) => {
            return (
                <li>
                    <span>{step}</span>
                </li>
            )
        });

        const commentsView = chosenComment.map((comment) => {
            const commentRating = function() {
                return (
                    <div>
                        {[...Array(5)].map((star, index) => {
                            index += 1;
                            return (
                                <span className={index <= comment.rating ? 'on' : 'off'}>&#9733;</span>
                            );
                        })}
                    </div>
                );
            }
            return (
                <Card>
                    <CardHeader>
                        {comment.user} says: 
                    </CardHeader>
                    <CardBody>
                        {commentRating()}
                        {comment.content}
                    </CardBody>
                </Card>
            )
        })

        return(
            <div>
                <h1>{chosenRecipe.title}</h1>
                <Link to="/forkrecipe"
                    state={{chosenRecipe: chosenRecipe}}
                    >
                    <img src='../fork.png'
                        alt=""
                        id="newRecipeButton"
                        />
                </Link>
                <img className="recipeimage" src={chosenRecipe.image} alt={chosenRecipe.title}></img>
                <ListGroup horizontal>
                    {chosenRecipe.course ? <ListGroupItem className='flex-fill'>{chosenRecipe.course}</ListGroupItem> : <></>}
                    {chosenRecipe.cuisine ? <ListGroupItem className='flex-fill'>{chosenRecipe.cuisine}</ListGroupItem> : <></>}
                    {chosenRecipe.servings ? <ListGroupItem className='flex-fill'>{chosenRecipe.servings} Servings</ListGroupItem> : <></>}
                </ListGroup>
                <ListGroup horizontal>
                    {chosenRecipe.preptime ? <ListGroupItem className='flex-fill'>Preptime: {chosenRecipe.preptime} minutes</ListGroupItem> : <></>}
                    {chosenRecipe.cooktime ? <ListGroupItem className='flex-fill'>Cooktime: {chosenRecipe.cooktime} minutes</ListGroupItem> : <></>}
                </ListGroup>
                <ListGroup>
                    <ListGroupItem>
                        <h2>Ingredients</h2>
                        <List type='unstyled'>
                            {ingredientView}
                        </List>
                    </ListGroupItem>
                    <ListGroupItem>
                        <h2>Steps</h2>
                        <ListGroup numbered>
                            {stepsView}
                        </ListGroup>
                    </ListGroupItem>
                </ListGroup>
                <br></br>
                <h2>Comments</h2>
                {commentsView}
            </div>
        )
    };

    return(
        <div className='container' style={{position: 'relative'}}>
            {recipes[id] ? recipeView() : recipeLanding()}
        </div>
    )
}

export default RecipeBrowser;
