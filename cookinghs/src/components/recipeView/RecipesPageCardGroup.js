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
    // let [recipes] = useState(RECIPES);
    console.log(recipes);
    return (
        <div>
            <Container>
            <Row>
            {Object.entries(recipes).map(([key, value]) => (
                <Col lg={4} md={6}>
                 <Link to={key}>
                 <Card className="r-card article">
                
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
            

            </Card>

                 </Link>
                </Col>
            ))}
            </Row>

            </Container>

        </div>
    )
            }

    // Object.entries(recipes).map(([key, value]) => {
    //     return(
    //         <Col lg={4} md={6}>
    //             <Link to={key}>
    //             <Card className="r-card article">
                
    //                 <CardImg src={value.image} alt={value.title} className="recipeImg" top></CardImg>
    //                 {/* <img src={value.image} alt={value.title} className="articleimage"></img> */}
    //                 <CardBody className='card-body'>
    //                     {/* maybe bold this */}
    //                     <CardTitle className="articlename">
    //                     {value.title}
    //                     </CardTitle>
    //                     <CardSubtitle className='author-name'>
    //                         By: {value.author}
    //                     </CardSubtitle>
    //                     <CardSubtitle className='date-created'>
    //                     Date Created: {value.date}
    //                     </CardSubtitle>
    //                 </CardBody>
                

    //             </Card>
    //             </Link>
    //             <br></br>
    //         </Col>
        // )
    // });

    // filter code here!!

//     return (
//         <>
//             <h2 id="landingheader">All Recipes</h2>
//             <Link to="/writerecipe">
//                 <img src='../plus.png'
//                     alt=""
//                     id="newRecipeButton"
//                     />
//             </Link>
//             <Row>
//                 {recipeCards}
//             </Row>
//         </>
//     )
// }

// export default RecipeLanding;

const mapStateToProps = state => {
    return {
        recipes: state.RecipesPage
    }

}

export default connect(mapStateToProps)(RecipesPageCardGroup);