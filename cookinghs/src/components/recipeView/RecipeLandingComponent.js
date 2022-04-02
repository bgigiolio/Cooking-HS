import React from 'react';
import RecipesPageCardGroup from './RecipesPageCardGroup';
import SearchBar from "material-ui-search-bar";
import styles from '../../styles/recipelanding.module.css';
import { Button, Card } from 'reactstrap';
// import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Slider } from '@mui/material';
import { getFilteredRecipes } from "../../redux/recipePage/recipe-actions"
import { connect } from "react-redux";


class RecipeLanding extends React.Component {
    constructor() {
        super();
        this.state = {
          params: {},
          search: "",
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
      }
    
      onValueChange(event) {
        const params = {
            ingredients: "cornstarch"

        }
        getFilteredRecipes(params);
        // this.setState({
        //   selectedOption: event.target.value
        // });
      }

    //   
    handleSubmit(e) {
        e.preventDefault();
        console.log('You clicked submit.');
        // this.props.getFilteredRecipes({ingredients:"cornstarch"});
        this.props.getFilteredRecipes({title: "fried"});
        console.log("function should be called?")
    }

    // Handler for the Search Bar Querying
    handleSearch(key) {
        this.state.params["title"] = key
        console.log(this.state);
        this.props.getFilteredRecipes(this.state.params);
        console.log("end")
    }

    

    render() {
        return(
            <div className={styles.landingContainer}>
                <div className={styles.mainFilterSection}>
                    <h5 className={styles.filterHeader}>Filter Recipes</h5>

                    {/* Course Filter */}
                    <Button onClick={this.handleSubmit}>CLICK ME</Button>
                    <div className={styles.courseFilter}>
                        <h6>Course</h6>

                        {/* TODO: IF CHECKED THEN REMOVE CHECK: https://stackoverflow.com/questions/4957207/how-to-check-uncheck-radio-button-on-click */}
                        <div className={styles.courseButtons}>
                            <div className={styles.radioButton}>
                            <label>
                                <input
                                type="radio"
                                value="Appetizer"
                                checked={this.state.selectedOption === "Appetizer"}
                                onChange={this.onValueChange}
                                />
                                Appetizer
                            </label>
                            </div>

                            <div className={styles.radioButton}>
                            <label>
                                <input
                                type="radio"
                                value="Entree"
                                checked={this.state.selectedOption === "Entree"}
                                onChange={this.onValueChange}
                                />
                                Entree
                            </label>
                            </div>

                            <div className={styles.radioButton}>
                            <label>
                                <input
                                type="radio"
                                value="Main"
                                checked={this.state.selectedOption === "Main"}
                                onChange={this.onValueChange}
                                />
                                Main
                            </label>
                            </div>


                            <div className={styles.radioButton}>
                            <label>
                                <input
                                type="radio"
                                value="Dessert"
                                checked={this.state.selectedOption === "Dessert"}
                                onChange={this.onValueChange}
                                />
                                Dessert
                            </label>
                            </div>

                            <div className={styles.radioButton}>
                            <label>
                                <input
                                type="radio"
                                value="Beverage"
                                checked={this.state.selectedOption === "Beverage"}
                                onChange={this.onValueChange}
                                />
                                Beverage
                            </label>
                            </div>
      </div>

                    </div>
                    

                    {/* Cuisine Filter */}
                    <div className={styles.courseFilter}>
                        <h6>Cuisine</h6>

                    </div>
                   

                    {/* Difficulty Filter */}
                    <div className={styles.courseFilter}>
                    <h6>Difficulty</h6>

                    {/* https://www.geeksforgeeks.org/range-slider-using-material-ui-in-react/ */}
                    <Slider
                    getAriaLabel={() => 'Difficulty Level'}
                    value={2}
                    onChange={console.log("hehe")}
                    valueLabelDisplay="auto"
                    />

                    </div>

                    {/* Cooking Time Filter */}
                    <div className={styles.courseFilter}>
                    <h6>Cooking Time</h6>

                    </div>

                    {/* Ingredients Filter */}
                    <div className={styles.courseFilter}>
                    <h6>Ingredients</h6>

                    </div>
                   
                </div>



                <div className={styles.mainRecipeSection}>
                <div className={styles.topCategories}>
                    <div className={styles.addBtn}>
                        <Link to="/recipes/newrecipe">
                            <i className="fa-regular fa-square-plus"></i>
                        </Link>
                    </div>
                    {/* <div className={styles.categoryButtons}> */}
                        {/* all, quick fix and desserts */}
                        {/* <Button className={styles.categoryButton}>All Recipes</Button> */}
                        {/* <Button className={styles.categoryButton}>Quick Fix</Button> */}
                        {/* <Button className={styles.categoryButton}>Desserts</Button> */}
                    {/* </div> */}

                    <div className={styles.barDiv}>
                        <SearchBar className={styles.searchBar}
                        value={this.state.search}
                        onChange={(newValue) => this.setState({ search: newValue }, () =>console.log("logged: ", this.state.search))}
                        onRequestSearch={() => this.handleSearch(this.state.search)}
                        ></SearchBar>
                    </div>

                </div>
               
                <RecipesPageCardGroup users={this.props.users} comments={this.props.comments}/>
    
            </div>

            </div>
            
        )
    }
}

const mapDispatchToProps = (dispatch, params) => ({
    getFilteredRecipes: (params) => dispatch(getFilteredRecipes(params)),
})

export default connect(null, mapDispatchToProps)(RecipeLanding);
