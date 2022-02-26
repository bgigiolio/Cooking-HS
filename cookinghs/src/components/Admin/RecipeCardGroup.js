import React from "react";
//TODO @ZOHA: import a stylesheet

import { connect } from "react-redux";
import RecipeCard from "./RecipeCard";
import {Row, Col} from "reactstrap";

const RecipeCardGroup = ({ recipes }) => {
    return (
        <div>
            <Row xs={4}>
            {recipes.map((recipe) => (
                <Col>
                <RecipeCard key={recipe.id} recipeData={recipe}/>
                </Col>
            ))}
            </Row>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        recipes: state.AdminRecipes.recipes
    }

}

export default connect(mapStateToProps)(RecipeCardGroup);