import React from "react";
import { connect } from "react-redux";
import RecipeCard from "./RecipeCard";
import {Row, Col} from "reactstrap";
import axios from "axios";

const RecipeCardGroup = ( recipes ) => {
    return (
        
        <div>
            <Row xs={4}>
            {recipes.map((recipe) => (
                <Col>
                    <RecipeCard recipeData = {recipe}/>
                </Col>
            ))}
            </Row>

        </div>
    )
}


export default RecipeCardGroup;
