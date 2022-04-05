import React from "react";
import RecipeCardLegacy from "./RecipeCardLegacy";
import {Row, Col} from "reactstrap";

const RecipeCardGroupLegacy = ( props ) => {
    if(props.recipes.length !== 0){
        return (
            
            <div>
                <Row md={4}>
                {props.recipes.map((recipe) => (
                    <Col>
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