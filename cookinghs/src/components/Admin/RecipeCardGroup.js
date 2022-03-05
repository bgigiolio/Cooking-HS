import React from "react";
//TODO @ZOHA: import a stylesheet

import { connect } from "react-redux";
import RecipeCard from "./RecipeCard";
import {Row, Col, Container} from "reactstrap";

const RecipeCardGroup = ({ recipes }) => {
    return (
        <div>
            <Container>
            <Row>
            {recipes.map((recipe) => (
                <Col sm>
                <RecipeCard key={recipe.id} recipeData={recipe}/>
                </Col>
            ))}
            </Row>

            </Container>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        recipes: state.AdminRecipes.recipes
    }

}

export default connect(mapStateToProps)(RecipeCardGroup);