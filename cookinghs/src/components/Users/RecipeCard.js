import { Button } from 'reactstrap';
import { Card } from 'reactstrap';
import { Routes, Route, Link, useParams} from 'react-router-dom';
import { CardBody, CardTitle, CardText, CardImg } from 'reactstrap';
import React from 'react';
import styles from './UserCard.module.css';
import {connect} from 'react-redux';
import RecipeBrowser from '../recipeView/RecipeBrowserComponent';
import { deleteRecipe } from '../../redux/recipePage/recipe-actions';
import { Navigate } from 'react-router';

class RecipeCard extends React.Component {

    constructor(props){
        super(props);
        this.nav = this.nav.bind(this)
    }

    state = {
        nav : false
    }

    nav = () => {
        console.log("nav")
        this.setState({
            nav: true
        })
    }
    render(){
        if(!this.state.nav){
            return (
                <div id="toBuf">
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
                        {this.props.del ? <Button onClick={() => this.props.deleteRecipe(this.props.recipeData._id)} className={styles.del}>Delete Recipe</Button> : null}
                        {this.props.del ? <Button onClick={this.nav} className={styles.edit}>Edit Recipe</Button> : null}
                        
                    </CardBody>
                    <Routes>
                    <Route exact path="/recipes/:id" element={<RecipeBrowser/>}/>
                </Routes>
                </Card>
                </div>
                
            )
        }else{
            return(<Navigate to={"/recipes/" + this.props.recipeData._id + "/editrecipe"}/>)
        }
    }

};


const mapDispatchToProps = dispatch => {
    return ({
        deleteRecipe: (id) => dispatch(deleteRecipe(id))
    })
}
const RecipeCardFunc = (props) => (
    <RecipeCard
        {...props}
        params={useParams()}
    />
);
export default connect(null, mapDispatchToProps)(RecipeCardFunc);