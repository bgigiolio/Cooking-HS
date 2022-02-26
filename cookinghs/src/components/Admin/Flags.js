import React from "react";
import {Table} from "reactstrap";
import styles from "./Admin.module.css";

const Flags = () => {
    return (
        <Table striped bordered hover size="sm" className={styles.flag_table}>
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
      <th>Recipe</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>Chicken Fried Rice</td>
    </tr>
    <tr>
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
    </tr>
  </tbody>
</Table>
    );
}
export default Flags;