import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loading } from '../LoadingComponent';
import WriteRecipe from './WriteRecipeComponent';
import '../../styles/recipeview.css';
import '../../styles/colorpalette.css';
import '../../styles/defaults.css';
import { Container } from 'reactstrap';


function WriteWrapper(props) {
    const { id } = useParams()
    if (props.recipes.isLoading) {
        return(
            <Container>
                <Loading />
            </Container>
        )
    }

    else if (!props.user) {
        return(
            <Container >
                <div className="text-align-center">
                    <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_ktwnwv5m.json" background="transparent"  speed="1"  style={{width: "100%", height: "440px", marginTop: "20px", zIndex: "0"}} loop autoplay></lottie-player>
                    <h1>Please <Link to="/login" className="linkStyle">login</Link> to be able to post recipes!</h1>
                </div>
            </Container>
        )
    }

    else if (id) {
        const recipes = props.recipes.recipes
        const chosenRecipe = recipes.filter(recipe => recipe._id === id)[0]
        return(
            <>
                {chosenRecipe ? <WriteRecipe flag={props.flag} chosenRecipe={chosenRecipe} user={props.user}/> : <p>404 Recipe Not Found</p>}
            </>
        )
    }

    else {
        return(
            <WriteRecipe flag={props.flag} chosenRecipe={null} user={props.user}/> 
        )
    }
    
}

export default WriteWrapper;
