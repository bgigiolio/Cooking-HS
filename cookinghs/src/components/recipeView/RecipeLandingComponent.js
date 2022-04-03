import React from 'react';
import RecipesPageCardGroup from './RecipesPageCardGroup';
import SearchBar from "material-ui-search-bar";
import styles from '../../styles/recipelanding.module.css';
import { Button, Card, Input } from 'reactstrap';
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
          params: {
          },
          search: "",
          selectedCourse: null,
          selectedCuisine: null
        };
        this.onCourseChange = this.onCourseChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.setParamState = this.setParamState.bind(this)
      }

    // adds in the new query parameter and makes a server call to fetch appropriate data
      setParamState(newEl, param_key){

        if(param_key === "title"){
            this.setState({params: {title: newEl}}, () => {
                this.props.getFilteredRecipes(this.state.params);
              }); 
        }
        else if(param_key === "course"){
            this.setState({params: {course: newEl}}, () => {
                this.props.getFilteredRecipes(this.state.params);
                console.log("this print should be before")
              }); 
        }
        else{
            var p = this.state.params
            this.setState({params: p}, () => {
                this.props.getFilteredRecipes(this.state.params);
              }); 

        }
      
        

        

      }
    
      onCourseChange(e) {
          this.setState({
          selectedCourse: e.target.value
        });

        var course = e.target.value;
        // e.preventDefault()
        // var course = e.target.value;
        // this.setState({selectedCourse: e.target.value})

        this.state.params['course'] = e.target.value;
        this.props.getFilteredRecipes(this.state.params).then(
            () => {
                console.log(" i updated the params and heres the state now: ", this.state)
                console.log("value retention check!!!!: ", course)

                switch(course) {
                    case "Appetizer":
                        document.getElementById("radio-button-appetizer").firstChild.firstChild.checked = true
                        break;
                    case "Entree":
                      document.getElementById("radio-button-entree").firstChild.firstChild.checked = true
                      break;
                    case "Main":
                        document.getElementById("radio-button-main").firstChild.firstChild.checked = true
                        break;
                    case "Dessert":
                        document.getElementById("radio-button-dessert").firstChild.firstChild.checked = true
                    // code block
                    break;
                    case "Beverage":
                        document.getElementById("radio-button-bev").firstChild.firstChild.checked = true
                        // code block
                    break;
                    case "":
                        document.getElementById("radio-button-all").firstChild.firstChild.checked = true
                        // code block
                    break;
                    default:
                        break;
                      // code block
                  }
                this.setState({selectedCourse: course})
            }
        )

        // this.setParamState(e.target.value, "course").then(console.log("i dont want to print !!"))
        // .then(
        //     () => {
        //         console.log("i did the param update see: ", this.state.params);

        //     }
        // )
            // () => {
               
            //     console.log("did i retain course value??? : ", course);
            // }
        // )
        // .then((response) => response.json()).then( (course) => {
        //     console.log("response value!!!: ", course)

        // })
           
            // this.setState({ selectedCourse: course });

        
       
       
      }

    //   
    handleSubmit(e) {
        e.preventDefault();
        console.log('You clicked submit.');
        // document.getElementById('radio-button').label.input.checked=true;
        // this.state.params['course'] = "Appetizer";
        // console.log(this.state)
        
        // // this.state.selectedCourse = e.target.value;
        // var course = this.state.selectedCourse
        // // this.props.getFilteredRecipes({ingredients:"cornstarch"});
        // this.props.getFilteredRecipes(this.state.params);
        // this.setState({selectedCourse: course}, () =>console.log("logged: ", this.state.selectedCourse))

       
    }

    // Handler for the Search Bar Querying
    handleSearch(key) {
        // this.setState({...this.state.params, title: "chicken"});
        // console.log("params after setstate: ", this.state.params)
        this.setParamState(key, "title");


        // this.setState({params: {title: key}}, () => {
        //     console.log(this.state);
        //     console.log("params after setstate: ", this.state.params)
        //     this.props.getFilteredRecipes(this.state.params);
        //   }); 

       
        
    }

    

    render() {
        return(
            <div className={styles.landingContainer}>
                <div className={styles.mainFilterSection}>
                    <h5 className={styles.filterHeader}>Filter Recipes</h5>

                    {/* Course Filter */}

                    {/* todo: remove testing code */}
                    {/* <Button onClick={this.handleSubmit}>CLICK ME</Button> */}
                    <div className={styles.courseFilter}>
                        <h6>Course</h6>

                        {/* TODO: IF CHECKED THEN REMOVE CHECK: https://stackoverflow.com/questions/4957207/how-to-check-uncheck-radio-button-on-click */}
                        <div className={styles.courseButtons}>
                            <span className={styles.twoRadioButtons1}>

                            <div className={styles.radioButton} id="radio-button-appetizer"> 
                            <label>
                                <input
                                type="radio"
                                value="Appetizer"
                                checked={this.state.selectedCourse === "Appetizer"}
                                onChange={this.onCourseChange}
                                />
                                Appetizer
                            </label>
                            </div>

                            <div className={styles.radioButtonEntree} id="radio-button-entree">
                            <label>
                                <input
                                type="radio"
                                value="Entree"
                                checked={this.state.selectedCourse === "Entree"}
                                onChange={this.onCourseChange}
                                />
                                Entree
                            </label>
                            </div>

                            </span>
                            
                            <span className={styles.twoRadioButtons2}>

                            <div className={styles.radioButton} id="radio-button-main">
                            <label>
                                <input
                                type="radio"
                                value="Main"
                                checked={this.state.selectedCourse === "Main"}
                                onChange={this.onCourseChange}
                                />
                                Main
                            </label>
                            </div>


                            <div className={styles.radioButtonDessert} id="radio-button-dessert">
                            <label>
                                <input
                                type="radio"
                                value="Dessert"
                                checked={this.state.selectedCourse === "Dessert"}
                                onChange={this.onCourseChange}
                                />
                                Dessert
                            </label>
                            </div>

                            
                            </span>

                            <span className={styles.twoRadioButtons3}>

                            <div className={styles.radioButton} id="radio-button-bev">
                            <label>
                                <input
                                type="radio"
                                value="Beverage"
                                checked={this.state.selectedCourse === "Beverage"}
                                onChange={this.onCourseChange}
                                />
                                Beverage
                            </label>
                            </div>


                            <div className={styles.radioButtonAllRecipes} id="radio-button-all">
                            <label>
                                <input
                                type="radio"
                                value=""
                                checked={this.state.selectedCourse === ""}
                                onChange={this.onCourseChange}
                                />
                                 All Recipes
                            </label>
                            </div>

                            </span>
      </div>

                    </div>
                    

                    {/* Cuisine Filter */}
                    <div className={styles.courseFilter}>
                        <h6>Cuisine</h6>

                        <span className={styles.twoRadioButtons1}>

                        <div className={styles.CheckBoxCuisine}>
                            <label>
                                <input
                                type="checkbox"
                                value="Asian"
                                checked={this.state.selectedCuisine === "Asian"}
                                onChange={this.onCuisineChange}
                                />
                                Asian
                            </label>
                        </div>

                        <div className={styles.CheckBoxCuisine}>
                            <label>
                                <input
                                type="checkbox"
                                value="Italian"
                                checked={this.state.selectedCuisine === "Italian"}
                                onChange={this.onCuisineChange}
                                />
                                Italian
                            </label>
                        </div>


                        </span>

                        <span className={styles.twoRadioButtons1}>

                        <div className={styles.CheckBoxCuisine}>
                            <label>
                                <input
                                type="checkbox"
                                value="French"
                                checked={this.state.selectedCuisine === "French"}
                                onChange={this.onCuisineChange}
                                />
                                French
                            </label>
                        </div>

                        <div className={styles.CheckBoxCuisine}>
                            <label>
                                <input
                                type="checkbox"
                                value="Indian"
                                checked={this.state.selectedCuisine === "Indian"}
                                onChange={this.onCuisineChange}
                                />
                                Indian
                            </label>
                        </div>


                        </span>

                        

                        <span className={styles.twoRadioButtons1}>

                        <div className={styles.CheckBoxCuisine}>
                            <label>
                                <input
                                type="checkbox"
                                value="Western"
                                checked={this.state.selectedCuisine === "Western"}
                                onChange={this.onCuisineChange}
                                />
                                Western
                            </label>
                        </div>

                        <div className={styles.CheckBoxCuisine}>
                            <label>
                                <input
                                type="checkbox"
                                value="Other"
                                checked={this.state.selectedCuisine === "Other"}
                                onChange={this.onCuisineChange}
                                />
                                Other
                            </label>
                        </div>



                        </span>
                      

                       

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
                        onChange={(newValue) => this.setState({ search: newValue }, () => console.log("logged: ", this.state.search))}
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
