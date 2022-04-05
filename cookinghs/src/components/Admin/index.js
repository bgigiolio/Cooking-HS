import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './Admin.module.css';
import Admin from './Admin';
import styles from "./AdminIndex.modules.css";

import React, { Component } from 'react'

export default class AdminPage extends Component {
  render() {
    return (
    <>
        {(this.props.users.isLoading || this.props.recipes.isLoading || this.props.comments.isLoading)? 
        null : <Admin users={this.props.users.users} recipes={this.props.recipes.recipes} comments={this.props.comments.comments} className={styles.bodyy}/> }
    </>
    )
  }
}

