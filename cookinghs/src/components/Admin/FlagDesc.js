import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from "../Admin/Admin.module.css";

const FlagDesc = (props) => {
    const location = useLocation();
    const {flag_info} = location.state
    // console.log(flag_info)
    return(
        <div className={styles.container}>
            <h3>Report Number {flag_info.key}</h3>
            <h4>Filed by: {flag_info.name}</h4>
            <h4>Recipe flagged: {flag_info.recipe}</h4>
            <h4>Comment or Entire Recipe: {flag_info.type}</h4>
            <h4>Complaint Description: {flag_info.desc}</h4>
        </div>
    )

}
export default FlagDesc;


