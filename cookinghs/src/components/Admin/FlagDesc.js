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
            <h3 className={styles.reportHeading}>Report ID {flag_info._id}</h3>
            <div>
                <p className={styles.reportDesc}><span className={styles.strong}>User who made the report:</span> {flag_info.reporter_user}</p>
                <p className={styles.reportDesc}><span className={styles.strong}>Reported User:</span> {flag_info.reported_user}</p>
                <p className={styles.reportDesc}><span className={styles.strong}>Item:</span> {flag_info.item}</p>
                <p className={styles.reportDesc}><span className={styles.strong}>Item Type:</span> {flag_info.item_type}</p>
                <p className={styles.reportDesc}><span className={styles.strong}>Category:</span> {flag_info.category}</p>
                <p className={styles.reportDesc}><span className={styles.strong}>Context:</span> {flag_info.context}</p>
            </div>
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


