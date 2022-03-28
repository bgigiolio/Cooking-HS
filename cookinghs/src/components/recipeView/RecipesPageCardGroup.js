import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import { Card, CardGroup, Container } from 'reactstrap';
import { CardBody, CardTitle, CardSubtitle, CardImg } from 'reactstrap'
import { Link } from 'react-router-dom';
import { RECIPES } from '../../shared/RecipeList';
import '../../styles/recipeview.css';
import '../../styles/colorpalette.css';
import { connect } from "react-redux";

// use cardgroup

const RecipesPageCardGroup = ({ recipes }) => {

    return (
        <div>
            <Container>
            <Row>
            {recipes.map((value) => (
                <Col lg={4} md={6}>
                 
                 <Card className="r-card article">
                 <Link to={value._id}>
                
                <CardImg src={value.image} alt={value.title} className="recipeImg" top></CardImg>
                {/* <img src={value.image} alt={value.title} className="articleimage"></img> */}
                <CardBody className='card-body'>
                    {/* maybe bold this */}
                    <CardTitle className="articlename">
                    {value.title}
                    </CardTitle>
                    <CardSubtitle className='author-name'>
                        By: {value.author}
                    </CardSubtitle>
                    {/* parse the date to remove the time etc. */}
                    <CardSubtitle className='date-created'>
                    Date Created: {value.date}
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

const mapStateToProps = state => {
    return {
        recipes: state.Recipes.recipes
    }

}

export default connect(mapStateToProps)(RecipesPageCardGroup);