import { Button } from 'reactstrap';
import { Card } from 'reactstrap';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CardBody, CardTitle, CardText, CardImg } from 'reactstrap';
import React from 'react';
import styles from './UserCard.module.css';
import {deleteRecipe} from "../../redux/UserPage/UserRecipes/UserRecipes-actions";
import {connect} from 'react-redux';
import RecipeBrowser from '../recipeView/RecipeBrowserComponent';
import axios from 'axios'; // new!!

class RecipeCard extends React.Component {
    constructor(props){
        super(props)
        axios.get("http://localhost:5000/api/recipes/" + this.props.recipeData)
        .then((response) => {
            this.state.title = response.data.title
            this.state.description = response.data.description
            this.forceUpdate()
        })
    }
    state = {
        title: "",
        description: ""
    }
    render(){
        return (
            <Card className={styles.user}>
                {/* <CardImg
                    alt="Card image cap"
                    src={recipeData.img}
                    top
                    className={styles.user_img}
                /> */}
                <CardBody>
                    <CardTitle tag="h5">
                        <Link to={"/recipes/" + this.props.recipeData}>{this.state.title}</Link>
                    </CardTitle>
                    <CardText>
                    {this.state.description}
                        {/* This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer. */}
                    </CardText>
                    {/* <Button onClick={()=>deleteRecipe(recipeData._id)}>
                        Delete Recipe
                    </Button> */}
                </CardBody>
                <Routes>
              <Route exact path="/recipes/:id" element={<RecipeBrowser/>}/>
            </Routes>
            </Card>
            
        )
    }

};

export default RecipeCard;