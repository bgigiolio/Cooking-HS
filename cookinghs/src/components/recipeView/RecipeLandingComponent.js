import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { RECIPES } from '../../shared/RecipeList';
import '../../styles/recipeview.css';
import '../../styles/colorpalette.css';

const RecipeLanding = function() {
    let [recipes] = useState(RECIPES);

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

export default RecipeLanding;