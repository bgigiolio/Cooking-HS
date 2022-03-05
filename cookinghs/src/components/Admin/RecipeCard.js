import { Button } from 'reactstrap';
import { Card } from 'reactstrap';
import { CardBody, CardTitle, CardText, CardImg } from 'reactstrap';
import React from 'react'
import styles from '../Admin/UserCard.module.css'
import {deleteRecipe} from "../../redux/AdminPage/AdminRecipes/AdminRecipes-actions";
import {connect} from 'react-redux';

const RecipeCard = ({recipeData, deleteRecipe}) => {
    return(
                <Card className={styles.user}>
                <CardImg
      alt="Card image cap"
      src={recipeData.img}
    // src={food}
      top
      className={styles.user_img}
    />
    <CardBody>
      <CardTitle tag="h5">
        {recipeData.name}
      </CardTitle>
      {/* <CardSubtitle
        className="mb-2 text-muted"
        tag="h6"
      >
       {recipeData.username}
      </CardSubtitle> */}
      <CardText>
      {recipeData.desc}
        {/* This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer. */}
      </CardText>
      <Button onClick={()=>deleteRecipe(recipeData.id)}>
        Delete Recipe
      </Button>
    </CardBody>
  </Card>
                
    );

};

const mapDispatchtoProps = dispatch => {
  return {
      deleteRecipe: (id) => dispatch(deleteRecipe(id)),
  };
};
export default connect(null,mapDispatchtoProps)(RecipeCard);