import { Button } from 'reactstrap';
import { Card } from 'reactstrap';
import { CardBody, CardTitle, CardSubtitle, CardImg } from 'reactstrap';
import React from 'react'
import styles from '../Admin/UserCard.module.css'
import {deleteUser} from "../../redux/AdminPage/AdminUsers/AdminUsers-actions";
import {connect} from 'react-redux';

const UserCard = ({userData, deleteUser}) => {
    return(
                <Card className={styles.user}>
                <CardImg
      alt="Card image cap"
      src={userData.img}
      top
      className={styles.user_img}
    />
    <CardBody>
      <CardTitle tag="h5">
        {userData.name}
      </CardTitle>
      <CardSubtitle
        className="mb-2 text-muted"
        tag="h6"
      >
       {userData.username}
      </CardSubtitle>
      {/* <CardText>
        This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
      </CardText> */}
      <Button onClick={()=>deleteUser(userData.id)}>
        Delete User
      </Button>
    </CardBody>
  </Card>
                
    );

};

const mapDispatchtoProps = dispatch => {
  return {
      deleteUser: (id) => dispatch(deleteUser(id)),
  };
};
export default connect(null,mapDispatchtoProps)(UserCard);