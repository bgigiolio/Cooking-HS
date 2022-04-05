import React from "react";
import RecipeCard from "./RecipeCard";
import {Row, Col} from "reactstrap";

const RecipeCardGroup = ( props ) => {
    const recipes = props.recipes.filter((recipe) => !recipe.deleted)
    return (
        <>
          { 
            props.isLoading ? null:
                <Row md={4}>
                {recipes.map((recipe) => (
                    <Col>
                        <RecipeCard recipeData = {recipe} del = {props.del}/>
                    </Col>
                ))}
                </Row>
          }
        </>
    )
}


export default RecipeCardGroup;
