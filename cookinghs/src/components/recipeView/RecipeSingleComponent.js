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

    const ingredientView = chosenRecipe.ingredients.map((ingredient) => {
        let amount;
        if (ingredient.quantity) {
            let quantity = ingredient.quantity * scale;
            if (scale % 1 === 0) {
                if (quantity%1 === 0){
                    amount = new Fraction(quantity).toString();
                }
                else if (quantity*3%1 === 0) {
                    amount = (quantity * 3).toString();
                    amount = amount.concat('/3');
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
            <li>
                <input type="checkbox" />
                <> </>
                {amount} 
                {ingredient.unit ? ingredient.unit + " " + ingredient.name.toLowerCase() : ingredient.name.toLowerCase()}
            </li>
        );
    });

    const stepsView = chosenRecipe.steps.map((step) => {
        return (
            <li className='stepsList'>
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
                        if (index <= comment.rating) {
                            return(
                                <svg className='starIcon' key={index}>
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
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
                </div>
            );
        }
        return (
            <>
                <Card>
                    <CardHeader>
                        {/* link to commenter user profile here */}
                        <span className='userLink'>{comment.user}</span> says: 
                    </CardHeader>
                    <CardBody>
                        {commentRating()}
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
                    <br></br>
                </ListGroupItem>
            </ListGroup>
        </div>
    )
};

export default RecipeSingle;
