import React from "react";
//TODO @ZOHA: import a stylesheet
import styles from "./Admin.module.css";

import { connect } from "react-redux";
import UserCard from "./UserCard";
import {Row, Col} from "reactstrap";

const UserCardGroup = ({ users }) => {
    return (
        <div>
            <Row xs={4} className={styles.card_row}>
            {users.map((user) => (
                <Col>
                <UserCard key={user.id} userData={user}/>
                </Col>
            ))}
            </Row>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        users: state.AdminUsers.users
    }

}

export default connect(mapStateToProps)(UserCardGroup);