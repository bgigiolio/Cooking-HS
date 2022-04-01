import React from "react";
import { connect } from "react-redux";
import RecipeCard from "./RecipeCard";
import {Row, Col} from "reactstrap";
import axios from "axios";

const RecipeCardGroup = ( recipes ) => {
    let recipeList = []
    // recipes.forEach(element=> {
    //     axios.get("http://localhost:5000/api/recipes/" + element)
    //     .then((response) => {
    //         console.log("pushing!")
    //         recipeList.push(response.data)
    //     })
    // });
    // console.log(typeof recipeList)
    // console.log(JSON.stringify(recipeList))
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