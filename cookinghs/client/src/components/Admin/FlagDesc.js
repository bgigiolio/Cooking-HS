import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from "../Admin/Admin.module.css";
import { Button } from 'reactstrap';
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
                <div className={styles.button_center}>
                    {(props.users.isLoading)
                    ? null
                    : <Button outline color="primary" className={styles.reportDesc}><span className={styles.strong}>User who made the report:</span> <Link to={`/users/${flag_info.reporter_user}`}>{flag_info.reporter_user} / {props.users.users.filter((user) => user._id === flag_info.reporter_user)[0].fullName} </Link> </Button>
                    }
                </div>
                <div className={styles.button_center}>
                    {(props.users.isLoading)
                    ? null
                    : <Button outline color="success" className={styles.reportDesc}><span className={styles.strong}>Reported User:</span> <Link to={`/users/${flag_info.reported_user}`}> {flag_info.reported_user} / {props.users.users.filter((user) => user._id === flag_info.reported_user)[0].fullName} </Link> </Button>
                    }
                </div>
                <div className={styles.button_center}>
                    {(props.comments.isLoading) || props.recipes.isLoading
                    ? null
                    : <Button outline color="warning"><span className={styles.strong}>Item:</span> <Link to={(flag_info.item_type === "recipe")? `/recipes/${flag_info.item}` : `/recipes/${props.comments.comments.filter((comment) => comment._id === flag_info.item)[0].recipeid}`}>{flag_info.item} / {props.recipes.recipes.filter((recipe) => recipe._id === ((flag_info.item_type === "recipe")? flag_info.item : (props.comments.comments.filter((comment) => comment._id === flag_info.item))[0].recipeid))[0].title} </Link></Button>
                    }
                </div>
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
        if(value.title === title){
            ret = key
        }
    })
    return ret;
    

}
export default FlagDesc;


