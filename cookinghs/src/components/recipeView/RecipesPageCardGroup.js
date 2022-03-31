import React from 'react';
import { Row, Col } from 'reactstrap';
import { Card, Container } from 'reactstrap';
import { CardBody, CardTitle, CardSubtitle, CardImg } from 'reactstrap'
import { Link } from 'react-router-dom';
import '../../styles/recipeview.css';
import '../../styles/colorpalette.css';
import { connect } from "react-redux";
import { setInitialRecipes } from "../../redux/RecipesPage/RecipesPage-actions";


const RecipesPageCardGroup = ({ recipes, users }) => {
    const recipestoRender = recipes.filter((recipe) => recipe.deleted === false)

    return (
        <div>
            <Container>
            <Row>
            {recipestoRender.map((value) => (
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
                                By: {users.filter((user) => user._id === value.author)[0].fullName}
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