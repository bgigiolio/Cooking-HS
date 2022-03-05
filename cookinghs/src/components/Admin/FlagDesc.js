import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from "../Admin/Admin.module.css";
import { Card } from 'reactstrap';
import { CardBody, CardTitle, CardText, CardImg, CardSubtitle } from 'reactstrap';
import {RECIPES} from '../../shared/RecipeList';
import { Link } from 'react-router-dom';
const FlagDesc = (props) => {
    const location = useLocation();
    const {flag_info} = location.state
    // console.log(
    //     Object.entries(RECIPES)
    //     .map( ([key, value]) => `My key is ${key} and my value is ${value}` )
    //   )
    // console.log(flag_info)
    var recipeID = matchRecipeFromTitle(flag_info.recipe)
    return(
        <div className={styles.container}>
            <h3 className={styles.reportHeading}>Report Number {flag_info.key}</h3>
            <Card className={styles.reportCard}>
            <CardBody>
                <CardTitle> <span className={styles.strong}>Recipe flagged:</span> <Link to={`/recipes/${recipeID}`}>{flag_info.recipe}</Link></CardTitle>
                <CardSubtitle><span className={styles.strong}>Filed by:</span> {flag_info.name}</CardSubtitle>
                <CardSubtitle><span className={styles.strong}>Complaint Category:</span> {flag_info.type}</CardSubtitle>
                <CardText className={styles.reportDesc}><span className={styles.strong}>Complaint Description:</span> {flag_info.desc}</CardText>
                </CardBody>
            </Card>
        </div>
    )

}
const matchRecipeFromTitle = (title) => {
    // in case the recipes aren't found, it goes to 0, the main page :)
    var ret = 0;
    Object.entries(RECIPES).map( ([key, value]) => {
        if(value.title == title){
            ret = key
        }
    })
    return ret;
    

}
export default FlagDesc;


