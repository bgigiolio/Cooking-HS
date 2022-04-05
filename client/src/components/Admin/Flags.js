import React from "react";
import {Table, Button} from "reactstrap";
import styles from "./Admin.module.css";
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import { deleteReport } from "../../redux/reports/report-actions"
import { deleteRecipe } from "../../redux/recipePage/recipe-actions"
import { deleteComment } from "../../redux/comments/comment-actions"

function Flags(props) {

    const resolveFlag = function(flag_id, item_type, item) {
        // if (item_type === "recipe") {
        //     props.deleteRecipe(item)
        // } else {
        //     props.deleteComment(item)
        // }
        props.deleteReport(flag_id)
    }
    
    const flags = props.reports.filter((report) => !report.resolved)

    return (
        <Table striped bordered hover size="sm" className={styles.flag_table}>
            <thead>
                <tr>
                <th>Reported Name</th>
                <th>Reported Username</th>
                <th>Recipe Name</th>
                <th>Type (recipe/comment report)</th>
                <th></th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {flags.map((flag) =>
                   <tr>
                        <td>{props.users.filter((user) => user._id === flag.reported_user)[0].fullName}</td>
                        <td>{props.users.filter((user) => user._id === flag.reported_user)[0].username}</td>
                        <td>{(flag.item_type === "recipe")? 
                        props.recipes.filter((recipe) => recipe._id === flag.item)[0] !== undefined ? props.recipes.filter((recipe) => recipe._id === flag.item)[0].title : null : 
                        props.recipes.filter((recipe) => recipe._id === props.comments.filter((comment) => comment._id === flag.item)[0].recipeid)[0].title}</td>
                        
                        <td>{flag.item_type}</td>
                        <td>
                            <Link to={{
                                pathname: `/admin/${flag._id}`,
                                state: {flag_info: true}
                            }} state={{flag_info: flag}}>
                            <Button> Details 
                        </Button>
                            </Link>
                        </td>
                        {<td> <Button className={styles.resolveBtn} onClick={()=>resolveFlag(flag._id, flag.item_type, flag.item)}>
                        Resolved
                        </Button></td>}
                    </tr>
                )}
            </tbody>
        </Table>
    );
}

const mapDispatchtoProps = dispatch => {
    return {
        deleteReport: (id) => dispatch(deleteReport(id)),
        deleteRecipe: (id) => dispatch(deleteRecipe(id)),
        deleteComment: (id) => dispatch(deleteComment(id))
    };
  };

export default connect(null,mapDispatchtoProps)(Flags);