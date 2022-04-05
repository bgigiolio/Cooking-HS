import React from "react";
import { connect } from "react-redux";
import RecipeCardLegacy from "./RecipeCardLegacy";
import {Row, Col} from "reactstrap";
import axios from "axios";

const RecipeCardGroupLegacy = ( props ) => {
    if(props.recipes.length !== 0){
        return (
            
            <div>
                <Row md={4}>
                {props.recipes.map((recipe) => (
                    <Col md={{offset: 1 }}>
                        <RecipeCardLegacy recipeData = {recipe}/>
                    </Col>
                ))}
                </Row>
    
            </div>
        )
    }else{
        return(null)
    }
}

export default RecipeCardGroupLegacy;