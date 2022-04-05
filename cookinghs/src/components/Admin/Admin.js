import React from 'react';
import styles from "./Admin.module.css";
import Flags from "./Flags";
import { connect } from 'react-redux';
import { baseUrl } from '../../shared/baseUrl';
import axios from 'axios'; // new!!

class Admin extends React.Component {
    constructor(props){
        super(props);
        this.state.admin = false
        axios.get(baseUrl + 'api/users/session', {params :{
            want : ["admin"]
        }}).then( async (response) => {
            this.state.admin = response.data.admin
            console.log("user loaded from state")
            this.forceUpdate();
        }).catch(function (error) {
            console.log(error)
    })
    }
    state = {
        admin: false
    }
    adminCheck(){
        window.location.reload(false);
    }

    render() {
        if(this.state.admin){
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
        }else{
            return(
            <div className={styles.AdminContainer}>
                <h1>Only cookHS admins may access this page!</h1>
                <br/>
            </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        Reports: state.Reports,
    }
}

export default connect(mapStateToProps, null)(Admin);