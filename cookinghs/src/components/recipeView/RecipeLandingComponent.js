import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../styles/recipeview.css';
import '../../styles/colorpalette.css';

const RecipeLanding = function(props) {
    let recipes = props.recipes

    const recipeCards = recipes.map((recipe) => {
        return(
            <Col lg={4} md={6}>
                <Link to={recipe._id} className="article">
                    <img src={recipe.image} alt={recipe.title} className="articleimage"></img>
                    <h4 className="articlename">{recipe.title}</h4>
                </Link>
                <br></br>
            </Col>
        )
    });

    return (
        <>
            <h2 id="landingheader">All Recipes 
                <Link to="./newrecipe">
                    <i className="fa-regular fa-square-plus" id="newRecipeButton"></i>
                </Link>
            </h2>
            <Row>
                {recipeCards}
            </Row>
        </>
    )
}

export default RecipeLanding;