import React, { useState } from 'react';
import { List, ListGroup, ListGroupItem, Card, CardBody, CardHeader, Button, Input, Label, FormGroup, Col } from 'reactstrap';
import { Fraction } from 'fractional';
import { Link } from 'react-router-dom';
import { RECIPES } from '../../shared/RecipeList';
import { COMMENTS } from '../../shared/RecipeComments';
import '../../styles/recipeview.css';
import '../../styles/colorpalette.css';
import ReviewModal from '../recipeForms/ReviewModalComponent';

function RecipeSingle(props) {
    let [recipes] = useState(RECIPES);
    let [comments] = useState(COMMENTS);
    const chosenRecipe = recipes[props.id] ? recipes[props.id] : null;
    const chosenComment = comments[props.id] ? comments[props.id] : null;
    let [servingSize, setServingSize] = useState(chosenRecipe.servings);
    let [scale, setScale] = useState(1);

    const sumWithInitial = chosenComment.reduce(
        (previousValue, currentValue) => {
        return(previousValue.rating ? previousValue.rating + currentValue.rating : previousValue + currentValue.rating)
        },
    );
    const averageRating = sumWithInitial/chosenComment.length

    const ingredientView = chosenRecipe.ingredients.map((ingredient, index) => {
        let amount;
        if (ingredient.quantity) {
            let quantity = ingredient.quantity * scale;
            if (scale % 1 === 0) {
                if (quantity%1 === 0){
                    amount = new Fraction(quantity).toString();
                }
                else if (quantity*3%1 === 0) {
                    amount = (quantity*3).toString();
                    amount = new Fraction(amount.concat('/3')).toString()
                }
                else {
                    amount = new Fraction(quantity).toString();
                }
            }
            else {
                amount = quantity.toFixed(2);
                if (quantity%1 === 0){
                    amount = new Fraction(quantity).toString();
                }
                else{
                    amount = amount.toString();
                }
            }
            
            amount = amount.concat(' ');
        }
            
        return (
            <li key={index}>
                <input type="checkbox" />
                <> </>
                {amount} 
                {ingredient.unit ? ingredient.unit + " " + ingredient.name.toLowerCase() : ingredient.name.toLowerCase()}
            </li>
        );
    });

    const stepsView = chosenRecipe.steps.map((step, index) => {
        return (
            <li className='stepsList' key={index}>
                <span>{step}</span>
            </li>
        )
    });

    const starRating = function(rating) {
        return (
            <>
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    if (index <= rating + 0.25) {
                        return(
                            <svg className='starIcon' key={index}>
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                            </svg>
                        )
                    }
                    else if (rating - index + 1 >= 0.25 & rating - index + 1 <= 0.75){
                        return(
                            <svg className='starIcon' key={index}>
                                <path d="M22 9.74l-7.19-.62L12 2.5 9.19 9.13 2 9.74l5.46 4.73-1.64 7.03L12 17.77l6.18 3.73-1.63-7.03L22 9.74zM12 15.9V6.6l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.9z"></path>
                            </svg>
                        )
                        
                    }
                    else {
                        return(
                            <svg className='starIcon' key={index}>
                                <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path>
                            </svg>
                        )
                    }
                })}
            </>
        );
    }

    let [commentCount, setCommentCount] = useState(3)
    const commentsView = chosenComment.slice(0,commentCount).map((comment) => {
        let rating = comment.rating;
        return (
            <>
                <Card>
                    <CardHeader>
                        {/* link to commenter user profile here */}
                        <span className='userLink'>{comment.user}</span> says: 
                    </CardHeader>
                    <CardBody>
                        <div>
                            {starRating(rating)}
                        </div>
                        {comment.content}
                    </CardBody>
                </Card>
            </>
        )
    })

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return(
        <div id='recipeViewContainer'>
            <ReviewModal
                toggle={toggle}
                isOpen={modal}
                title={chosenRecipe.title}
                id={props.id}
            />
            {/* <img src='../report.png' alt=''></img> */}
            <ListGroup>
                <ListGroupItem>
                <h1>{chosenRecipe.title}</h1>
                <Link to="/forkrecipe"
                    state={{chosenRecipe: chosenRecipe}}
                    >
                    <img src='../fork.png'
                        alt=""
                        id="newRecipeButton"
                        />
                </Link>
                <div id='averageRating'>
                    {starRating(averageRating)}
                </div>
                {/* link to author user profile here */}
                    {chosenRecipe.author ? <span> By <span className='userLink'>{chosenRecipe.author}</span></span> : null}
                </ListGroupItem>
                <img className="recipeimage" src={chosenRecipe.image} alt={chosenRecipe.title}></img>
                <ListGroupItem>
                    {chosenRecipe.description ? <span>{chosenRecipe.description}</span> : null}
                </ListGroupItem>
            </ListGroup>
            <ListGroup horizontal>
                {chosenRecipe.course ? <ListGroupItem className='flex-fill'>{chosenRecipe.course}</ListGroupItem> : <></>}
                {chosenRecipe.cuisine ? <ListGroupItem className='flex-fill'>{chosenRecipe.cuisine}</ListGroupItem> : <></>}
                {chosenRecipe.servings ? 
                    <ListGroupItem className='flex-fill' id="servingInputContainer">
                        <FormGroup row id="servingInput">
                            <Col sm={6}>
                                <Input
                                    id="servingSize"
                                    name="servingSize"
                                    type="number"
                                    min='1'
                                    style={{width:'60px'}}
                                    value={servingSize}
                                    onChange={(e) => {setServingSize(e.target.value);
                                        setScale(e.target.value/chosenRecipe.servings)}}
                                />
                            </Col>
                            <Label
                                for="servingSize"
                                sm={6}
                            >
                                Servings
                            </Label>
                        </FormGroup>
                    </ListGroupItem> : 
                    <></>
                }
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
                    <h2>Directions</h2>
                    <ol>
                        {stepsView}
                    </ol>
                </ListGroupItem>
                <ListGroupItem>
                    <h2>Comments</h2>
                    <Button className='color-secondary-bg' 
                        id='ratingButton'
                        color="danger"
                        onClick={toggle}
                    >
                        Add Rating and Review
                    </Button>
                    {commentsView}
                    <Button
                        onClick={() => setCommentCount(commentCount+3)}
                        id='loadReviewButton'
                    >
                        Load More Reviews
                    </Button>
                </ListGroupItem>
            </ListGroup>
        </div>
    )
};

export default RecipeSingle;
