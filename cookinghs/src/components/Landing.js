import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import styles from "../styles/Landing.module.css";
import SearchBar from "material-ui-search-bar";
import {Card, CardImg, Button} from 'reactstrap';
import RecipeBrowser from './recipeView/RecipeBrowserComponent';

class Landing extends React.Component {

    state={
        search: "",
        toRender: null
    }
    jump = (searchItem) => {
        this.setState({
            toRender: <Navigate to={"/recipes"}/>
        }, () => console.log("Navigating!"))
    }
    render() {
        return(
            <div className={styles.landingContainer}>
                <div className={styles.welcomeText}>
                    Welcome to
                </div>
                <div className={styles.appName}>
                    CookingHS
                </div>
                <span className={styles.landingButtons}>
                    {/* <Link to={"/recipes"}>
                    <Button className={styles.landingButton}>Let's get Cooking!</Button>
                    </Link> */}
                    <SearchBar className={styles.search}
                        value={this.state.search}
                        onChange={(newValue) => this.setState({ search: newValue }, () =>console.log("logged"))}
                        onRequestSearch={() => this.jump(this.state.search)}
                    />
                    {this.state.toRender}
                   
                </span>
                <Routes>
                    <Route exact path="/recipes" element={<RecipeBrowser />}/>
                </Routes>

            </div>
        )
    }
}

export default Landing;