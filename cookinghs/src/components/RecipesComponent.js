import React, { useState } from 'react';
import { List, ListGroup, ListGroupItem, Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import { Fraction } from 'fractional';
import { useParams, Link } from 'react-router-dom';
import { RECIPES } from '../shared/RecipeList';
import { COMMENTS } from '../shared/RecipeComments';
import '../styles/recipes.css';


function Recipes() {
    const { id } = useParams();
    let [recipes, setRecipes] = useState(RECIPES);
    let [comments, setComments] = useState(COMMENTS);
    const chosenRecipe = recipes[id] ? recipes[id] : 'Recipe';
    const chosenComment = comments[id] ? comments[id] : 'Comments';

    const recipeButtons = Object.entries(recipes).map(([key, value]) => {
        return(
            <Col lg={4} md={6}>
                <Link to={key} className="article">
                    <img src={value.image} alt={value.name} className="articleimage"></img>
                    <h4 className="articlename">{value.name}</h4>
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
                        style={{position: "absolute",
                            top: 0,
                            right: 0,
                            height: 50}}/>
                </Link>
                <Row>
                    {recipeButtons}
                </Row>
            </>
        )
    }
    

    const recipeView = function() {
        const ingredientView = chosenRecipe.ingredients.map((ingredient) => {
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
                    <input type="checkbox" />
                    <> </>
                    {amount} {ingredient[2] ? ingredient[2] + " " + ingredient[0].toLowerCase() : ingredient[0].toLowerCase()}
                </li>
            );
        });
    
        const stepsView = chosenRecipe.steps.map((step) => {
            return (
                <li>
                    {step}
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
                                <span className="star" className={index <= comment.rating ? "on" : "off"}>&#9733;</span>
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
                <h1>{chosenRecipe.name}</h1>
                <img className="recipeimage" src={chosenRecipe.image} alt={chosenRecipe.name}></img>
                <ListGroup horizontal>
                    {chosenRecipe.course ? <ListGroupItem className='flex-fill'>{chosenRecipe.course}</ListGroupItem> : <></>}
                    {chosenRecipe.cuisine ? <ListGroupItem className='flex-fill'>{chosenRecipe.cuisine}</ListGroupItem> : <></>}
                    {chosenRecipe.servings ? <ListGroupItem className='flex-fill'>{chosenRecipe.servings} Servings</ListGroupItem> : <></>}
                </ListGroup>
                <ListGroup horizontal>
                    {chosenRecipe.preptime ? <ListGroupItem className='flex-fill'>Preptime: {chosenRecipe.preptime}</ListGroupItem> : <></>}
                    {chosenRecipe.cooktime ? <ListGroupItem className='flex-fill'>Cooktime: {chosenRecipe.cooktime}</ListGroupItem> : <></>}
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

export default Recipes;
