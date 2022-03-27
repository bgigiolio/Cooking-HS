import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { RECIPES } from '../../shared/NewRecipeList';
import '../../styles/recipeview.css';
import '../../styles/colorpalette.css';

const RecipeLanding = function() {
    let [recipes] = useState(RECIPES);
    console.log(recipes)

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
            <h2 id="landingheader">All Recipes</h2>
            <Link to="/writerecipe">
                <i class="fa-regular fa-square-plus" id="newRecipeButton"></i>
            </Link>
            <Row>
                {recipeCards}
            </Row>
        </>
    )
}

export default RecipeLanding;