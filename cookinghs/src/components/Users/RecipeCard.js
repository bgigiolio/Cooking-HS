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
            this.state.image = response.data.image
            this.state.title = response.data.title
            this.state.description = response.data.description
            this.state.deleted = response.data.deleted
            this.forceUpdate()
        })
    }
    state = {
        title: "",
        description: "",
        deleted: false
    }
    deleteRecipe(){
        axios.delete("http://localhost:500/api/recipes/" + this.props.recipeData)
        .then(this.forceUpdate())
    }
    render(){
        if(!this.state.deleted){
            return (
                <Card className={styles.user}>
                    <CardImg
                        alt="Card image cap"
                        src={this.state.image}
                        top
                        className={styles.user_img}
                    />
                    <CardBody className={styles.body}>
                        <CardTitle tag="h5">
                            <Link to={"/recipes/" + this.props.recipeData}>{this.state.title}</Link>
                        </CardTitle>
                        <CardText>
                        {this.state.description.slice(0, 100) + "..."}
                            {/* This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer. */}
                        </CardText>
                        <Button onClick={this.deleteRecipe.bind(this)}>
                            Delete Recipe
                        </Button>
                    </CardBody>
                    <Routes>
                  <Route exact path="/recipes/:id" element={<RecipeBrowser/>}/>
                </Routes>
                </Card>
                
            )
        }else{
            return(null)
        }
    }

};

export default RecipeCard;