import React from 'react';
import { Row, Col } from 'reactstrap';
import { Card, CardGroup, Container } from 'reactstrap';
import { CardBody, CardTitle, CardSubtitle, CardImg } from 'reactstrap'
import { Link } from 'react-router-dom';
import '../../styles/recipeview.css';
import '../../styles/colorpalette.css';
import { connect } from "react-redux";
import { setInitialRecipes } from "../../redux/RecipesPage/RecipesPage-actions";
import axios from 'axios';
import {useEffect } from 'react';


const RecipesPageCardGroup = ({ recipes }) => {

    return (
        <div>
            <Container>
            <Row>
            {recipes.map((value) => (
                <Col lg={4} md={6} key={value._id}>
                 
                 <Card className="r-card article">
                 <Link to={value._id}>
                
                <CardImg src={value.image} alt={value.title} className="recipeImg" top></CardImg>
                <CardBody className='card-body'>
                    {/* maybe bold this */}
                    <CardTitle className="articlename">
                    {value.title}
                    </CardTitle>
                    <CardSubtitle className='author-name'>
                        By: {value.author}
                    </CardSubtitle>
                    {/* remove extra datetime values */}
                    <CardSubtitle className='date-created'>
                    Date Created: {value.date.slice(0,10)}
                    </CardSubtitle>
                </CardBody>
            
                </Link>
            </Card>
                </Col>
            ))}
            </Row>
            </Container>
        </div>
        )
    }

const mapDispatchToProps = (dispatch) => {
    return {
        setInitialRecipes: (recipes) => dispatch(setInitialRecipes(recipes)),
    }
  }

const mapStateToProps = state => {
    return {
        recipes: state.Recipes.recipes
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesPageCardGroup);