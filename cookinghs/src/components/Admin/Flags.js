import React from "react";
import {Table, Button} from "reactstrap";
import styles from "./Admin.module.css";
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import { deleteReport } from "../../redux/reports/report-actions"

function Flags(props) {

    const resolveFlag = function(id) {
        props.deleteReport(id)
    }

    const flags = props.reports.filter((report) => !report.resolved)

    return (
        <Table striped bordered hover size="sm" className={styles.flag_table}>
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Username</th>
                <th>Recipe</th>
                <th>Type</th>
                <th></th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {flags.map((flag) =>

                   <tr>
                        <td>{flag._id}</td>
                        <td>{props.users.filter((user) => user._id === flag.reported_user)[0].fullName}</td>
                        <td>{props.users.filter((user) => user._id === flag.reported_user)[0].username}</td>
                        <td>{flag.item}</td>
                        <td>{flag.item_type}</td>
                        <td>
                            <Link to={{
                                pathname: `/admin/${flag.key}`,
                                state: {flag_info: true}
                            }} state={{flag_info: flag}}>
                            <Button> Details 
                        </Button>
                            </Link>
                        </td>
                        {<td> <Button className={styles.resolveBtn} onClick={()=>resolveFlag(flag._id)}>
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

    };
  };

export default connect(null,mapDispatchtoProps)(Flags);