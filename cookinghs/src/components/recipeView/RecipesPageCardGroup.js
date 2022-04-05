import React from 'react';
import { Row, Col } from 'reactstrap';
import { Card, Container } from 'reactstrap';
import { CardBody, CardTitle, CardSubtitle, CardImg, CardFooter } from 'reactstrap'
import { Link } from 'react-router-dom';
import '../../styles/recipeview.css';
import '../../styles/colorpalette.css';
import { connect } from "react-redux";
import { setInitialRecipes } from "../../redux/RecipesPage/RecipesPage-actions";


const RecipesPageCardGroup = ({ recipes, users, comments, all_recipes }) => {
    const recipestoRender = recipes.filter((recipe) => recipe.deleted === false)
    // console.log("recipe print:", recipestoRender);
    // console.log("comment print", comments)
    console.log("ALLRECIPE PRINT:", all_recipes)

    const rating = (chosenRecipe) => {
        let averageRating = 0
        let averageRatingString = ""
        if (!comments.isLoading) {
            const chosenComment = comments.filter((comment) => comment.recipeid === chosenRecipe._id)
            if (chosenComment.length) {
                chosenComment.map((comment) => averageRating += comment.rating)
                averageRating /= chosenComment.length
                averageRatingString = averageRating.toFixed(2)
            }
            else {
                averageRatingString = "No ratings yet"
            }
        }
        return [averageRating, averageRatingString]
    }

    const starRating = function(rating) {
        return (
            <>
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    if (index <= rating + 0.25) {
                        return(
                            <svg viewBox="0 0 32 32" className='starIconRP' key={index}>
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                            </svg>
                        )
                    }
                    else if (rating - index + 1 >= 0.25 & rating - index + 1 <= 0.75){
                        return(
                            <svg viewBox="0 0 32 32" className='starIconRP' key={index}>
                                <path d="M22 9.74l-7.19-.62L12 2.5 9.19 9.13 2 9.74l5.46 4.73-1.64 7.03L12 17.77l6.18 3.73-1.63-7.03L22 9.74zM12 15.9V6.6l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.9z"></path>
                            </svg>
                        )
                        
                    }
                    else {
                        return(
                            <svg viewBox="0 0 32 32" className='starIconRP' key={index}>
                                <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path>
                            </svg>
                        )
                    }
                })}
            </>
        );
    }

    return (
        <div>
            <Container className='card-group-container'>
            <Row className='card-row'>
            {recipestoRender.map((value) => (
                <Col lg={4} md={6} key={value._id} className='card-col'>
                    <Card className="r-card article">
                    <Link to={value._id}>
                        <CardImg src={value.image} alt={value.title} className="recipeImg" top></CardImg>
                        <CardBody className='card-body'>
                            {/* maybe bold this */}
                            <CardTitle className="articlename">
                            {value.title}
                            </CardTitle>
                            <CardSubtitle className='author-name'>
                                By: {users.filter((user) => user._id === value.author)[0].fullName}
                            </CardSubtitle>
                            {/* remove extra datetime values */}
                            <CardSubtitle className='date-created'>
                            Date Created: {value.date.slice(0,10)}
                            </CardSubtitle>
                        </CardBody>
                        <CardFooter className='extra-info-footer'>
                            <span>{starRating(rating(value)[0])} {comments.filter((comment) => comment.recipeid === value._id).length} ratings 
                            <span className='fork-span'> {all_recipes.filter((recipe) => recipe.parent.includes(value._id)).length} fork(s)</span></span>
                            <span></span>
                            <span><i className="fa-solid fa-bookmark bookmark-icon"></i></span>
                            </CardFooter>
                    </Link>
                    </Card>
                </Col>
            ))}
            </Row>
            </Container>
        </div>
        )
    }

const mapDispatchToProps = (dispatch) => {
    return {
        setInitialRecipes: (recipes) => dispatch(setInitialRecipes(recipes)),
    }
  }

const mapStateToProps = state => {
    return {
        recipes: state.Recipes.filtered_recipes
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesPageCardGroup);