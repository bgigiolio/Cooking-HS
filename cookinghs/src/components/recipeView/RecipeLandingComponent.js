import React from 'react';
import RecipesPageCardGroup from './RecipesPageCardGroup';
import SearchBar from "material-ui-search-bar";
import styles from '../../styles/recipelanding.module.css';
import { Button, Card } from 'reactstrap';
// import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Slider } from '@mui/material';


class RecipeLanding extends React.Component {
    constructor() {
        super();
        this.state = {
          name: "React"
        };
        this.onValueChange = this.onValueChange.bind(this);
      }
    
      onValueChange(event) {
        this.setState({
          selectedOption: event.target.value
        });
      }

    

    render() {
        return(
            <div className={styles.landingContainer}>
                <div className={styles.mainFilterSection}>
                    <h5 className={styles.filterHeader}>Filter Recipes</h5>

                    {/* Course Filter */}
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
                    <div className={styles.categoryButtons}>
                        {/* all, quick fix and desserts */}
                        <Button className={styles.categoryButton}>All Recipes</Button>
                        <Button className={styles.categoryButton}>Quick Fix</Button>
                        <Button className={styles.categoryButton}>Desserts</Button>
                    </div>

                    <div className={styles.barDiv}>
                        <SearchBar className={styles.searchBar}></SearchBar>
                    </div>

                </div>
               
                <RecipesPageCardGroup/>
    
            </div>

            </div>
            
        )
    }
}

export default RecipeLanding;