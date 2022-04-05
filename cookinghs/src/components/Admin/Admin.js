import React from 'react';
import UserCardGroup from './UserCardGroup';
import styles from "./Admin.module.css";
import RecipeCardGroup from './RecipeCardGroup';
import Flags from "./Flags";
import { connect } from 'react-redux';

class Admin extends React.Component {

    render() {
        return(
            <div className={styles.AdminContainer}>
                <h3 className={styles.h3}>Admin Profile</h3>
                <h4 className={styles.h4}>Flags</h4>
                <Flags
                    reports={this.props.Reports.reports} 
                    users={this.props.users}
                    recipes={this.props.recipes}
                    comments={this.props.comments}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        Reports: state.Reports,
    }
}

export default connect(mapStateToProps, null)(Admin);