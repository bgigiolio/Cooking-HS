import React from "react";
import {Table, Button} from "reactstrap";
import styles from "./Admin.module.css";
import {resolveFlag} from "../../redux/AdminPage/AdminFlags/AdminFlags-actions";
import {connect} from 'react-redux';
import { Link } from "react-router-dom";

const Flags = ({ flags, resolveFlag }) => {
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
  {flags.map((flag) => (
     
       <tr>
                <td>{flag.id}</td>
                <td>{flag.name}</td>
                <td>{flag.username}</td>
                <td>{flag.recipe}</td>
                <td>{flag.type}</td>
                <td>
                    <Link to={{
                        pathname: `/admin/${flag.key}`,
                        state: {flag_info: true}
                    }} state={{flag_info: flag}}>
                    <Button> Details 
                </Button>
                    </Link>
                </td>
                <td> <Button className={styles.resolveBtn} onClick={()=>resolveFlag(flag.id)}>
                Resolved
                </Button></td>
        </tr>
            ))}
    
    {/* <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@thorny</td>
      <td>Spiced Eggplant</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Larry the Bird</td>
      <td>Berry</td>
      <td>@twitter</td>
      <td>Crispy Beef</td>
    </tr> */}
  </tbody>
</Table>
    );
}

const mapStateToProps = state => {
    return {
        flags: state.AdminFlags.flags
    }

}
const mapDispatchtoProps = dispatch => {
    return {
        resolveFlag: (id) => dispatch(resolveFlag(id)),
    };
  };

export default connect(mapStateToProps,mapDispatchtoProps)(Flags);