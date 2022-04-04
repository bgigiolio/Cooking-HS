import React from "react";
import { connect } from "react-redux";
import RecipeCard from "./RecipeCard";
import {Row, Col} from "reactstrap";
import axios from "axios";

const RecipeCardGroup = ( props ) => {
    console.log(props.recipes)
    const recipes = props.recipes.filter((recipe) => !recipe.deleted)
    return (
        <>
          { 
            props.isLoading ? null:
                <Row md={4}>
                {recipes.map((recipe) => (
                    <Col>
                        <RecipeCard recipeData = {recipe}/>
                    </Col>
                ))}
                </Row>
          }
        </>
    )
}


export default RecipeCardGroup;
