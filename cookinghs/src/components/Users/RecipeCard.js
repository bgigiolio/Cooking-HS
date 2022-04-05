import { Button } from 'reactstrap';
import { Card } from 'reactstrap';
import { Routes, Route, Link } from 'react-router-dom';
import { CardBody, CardTitle, CardText, CardImg } from 'reactstrap';
import React from 'react';
import styles from './UserCard.module.css';
import {connect} from 'react-redux';
import RecipeBrowser from '../recipeView/RecipeBrowserComponent';
import { deleteRecipe } from '../../redux/recipePage/recipe-actions';

class RecipeCard extends React.Component {
    // constructor(props){
    //     super(props)
    //     axios.get(baseUrl + "api/recipes/" + this.props.recipeData)
    //     .then((response) => {
    //         this.state.image = response.data.image
    //         this.state.title = response.data.title
    //         this.state.description = response.data.description
    //         this.state.deleted = response.data.deleted
    //         this.forceUpdate()
    //     })
    // }
    // state = {
    //     title: "",
    //     description: "",
    //     deleted: false
    // }
    // deleteRecipe(){
    //     axios.delete(baseUrl + "api/recipes/" + this.props.recipeData)
    //     .then(this.forceUpdate())
    // }
    render(){
        return (
            <Card className={styles.user}>
                <CardImg
                    alt="Card image cap"
                    src={this.props.recipeData.image}
                    top
                    className={styles.user_img}
                />
                <CardBody className={styles.body} style={{width: "100%"}}>
                    <CardTitle tag="h5">
                        <Link to={"/recipes/" + this.props.recipeData._id}>{this.props.recipeData.title}</Link>
                    </CardTitle>
                    <CardText>
                    {this.props.recipeData.description !== undefined ? this.props.recipeData.description.slice(0, 100) + "..." : null}
                        {/* This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer. */}
                    </CardText>
                    {this.props.del ? <Button onClick={() => this.props.deleteRecipe(this.props.recipeData._id)}>Delete Recipe</Button> : null}
                    
                </CardBody>
                <Routes>
                <Route exact path="/recipes/:id" element={<RecipeBrowser/>}/>
            </Routes>
            </Card>
            
        )
    }

};


const mapDispatchToProps = dispatch => {
    return ({
        deleteRecipe: (id) => dispatch(deleteRecipe(id))
    })
}


export default connect(null, mapDispatchToProps)(RecipeCard);