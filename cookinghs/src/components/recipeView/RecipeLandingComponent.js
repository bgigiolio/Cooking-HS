import React from 'react';
import RecipesPageCardGroup from './RecipesPageCardGroup';
import SearchBar from "material-ui-search-bar";
import styles from '../../styles/recipelanding.module.css';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Slider } from '@mui/material';
import { getFilteredRecipes, updateCookTime, updateCourse, updateSort } from "../../redux/recipePage/recipe-actions"
import { connect } from "react-redux";
import { addCuisines, removeCuisines, addIngredients, removeIngredients, updateDifficulty } from '../../redux/recipePage/recipe-actions';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


class RecipeLanding extends React.Component {
    constructor() {
        super();
        this.state = {
          params: {
          },
          search: "",
          selectedCourse: null,
          selectedCuisine: [],
          selectedIngredients: [],
          difficulty: "4",
          cooktime: "0",
          dropdownOpen: false,
          sort: "Date",
          marks: [
            {
              value: 0,
              label: '1',
            },
            {
              value: 1,
              label: '2',
            },
            {
              value: 2,
              label: '3',
            },
            {
              value: 3,
              label: '4',
            },
            {
                value: 4,
                label: '5',
              },
          ],
          cookingTime: [
            {
              value: 0,
              label: '10',
            },
            {
              value: 1,
              label: '20',
            },
            {
              value: 2,
              label: '30',
            },
            {
              value: 3,
              label: '40',
            },
            {
                value: 4,
                label: '50',
              },
              {
                value: 5,
                label: '>60',
              },
          ],
          cookingTimeEval: [
            {
              value: 0,
              label: '10',
            },
            {
              value: 1,
              label: '20',
            },
            {
              value: 2,
              label: '30',
            },
            {
              value: 3,
              label: '40',
            },
            {
                value: 4,
                label: '50',
              },
              {
                value: 5,
                label: '>60',
              },
              {
                  value: 6,
                  label: "500",
              }
          ],
        };
        this.onCourseChange = this.onCourseChange.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
        this.onDifficultyChange = this.onDifficultyChange.bind(this);
        this.onCookTimeChange = this.onCookTimeChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.setParamState = this.setParamState.bind(this);
        this.onCuisineChange = this.onCuisineChange.bind(this);
        this.onIngredientChange = this.onIngredientChange.bind(this)
        this.toggle = this.toggle.bind(this)
        this.clearAll = this.clearAll.bind(this)
      }


    clearAll(e){
        // 1. set all states to default
        // 1.1 the props
        // this.props.cuisines = []
        // this.props.ingredients = []
        // this.props.difficulty = [4]
        // this.props.cooktime = []
        // this.props.course = [""]
        // this.props.sort = ["date"]
    
    for(var i = 0; i < this.props.cuisines.length; i++){
        this.props.removeCuisines(this.props.cuisines[i])
    }

    for(var j = 0; j < this.props.ingredients.length; j++){
        this.props.removeIngredients(this.props.ingredients[i])
    }

    this.props.updateDifficulty(4);
    this.props.updateCookTime(6);
    this.props.updateCourse("");
    this.props.updateSort("Date");
    

        
        // 1.2: the states 
        this.setState({sort: "Date"});
        this.setState({selectedCourse: null});
        this.setState({selectedCuisine: []});
        this.setState({selectedIngredients: []});
        this.setState({difficulty: "4"});
        this.setState({cooktime: "0"});
        this.setState({params: {}}, () => {
            this.props.getFilteredRecipes(this.state.params).then(
                console.log("successfully cleared filters")
            )
        })



        // 2. pass in empty query
        console.log(e.target.value);
    }

    toggle(){
        console.log("toggled!")
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
          }));

    }

    onSortChange(e){
        console.log(e.target.value)
        var s = e.target.value;
        console.log("s")
        var d = this.state.marks[this.props.difficulty[this.props.difficulty.length-1]].label
        var c = this.props.cuisines
        var ings = this.props.ingredients
        var crse = this.props.course[this.props.course.length-1]
        var ct = this.state.cookingTimeEval[this.props.cooktime[this.props.cooktime.length - 1]].label

        this.setState({
            sort: e.target.value
          }, () => {
            this.props.updateSort(s)
              this.setState({params: {cooktime: ct, difficulty: d, cuisine: c, ingredients: ings, course: crse, sort: s}}, () => {
                  console.log("param update: ", this.state.params)
                  this.props.getFilteredRecipes(this.state.params).then(
                      console.log("acquired filtered recipes")
                  )
              })
          });
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

      onCookTimeChange(e, val){
        var idx = val;
        console.log("idx: ", idx)
        var diff = this.state.cookingTime[idx].label;
        this.props.updateCookTime(idx)
        var pass_prop = diff;
        var d = this.state.marks[this.props.difficulty[this.props.difficulty.length-1]].label
        var c = this.props.cuisines
        var ings = this.props.ingredients
        var crse = this.props.course[this.props.course.length-1]
        console.log("diff: ", diff);
        this.setState({
            cooktime: e.target.value
          }, () => {
            this.props.updateCookTime(idx)
              this.setState({params: {cooktime: pass_prop, difficulty: d, cuisine: c, ingredients: ings, course: crse}}, () => {
                  console.log("param update: ", this.state.params)
                  this.props.getFilteredRecipes(this.state.params).then(
                      console.log("acquired filtered recipes")
                  )
              })
          });

      }
      
      onDifficultyChange(e,val){
        var diff = val;
        this.props.updateDifficulty(diff)
        var pass_prop = this.state.marks[diff].label;
        // var d = this.props.difficulty[this.props.difficulty.length-1]
        var c = this.props.cuisines
        var ings = this.props.ingredients
        var crse = this.props.course[this.props.course.length-1]
        console.log("error situation: ", this.props.cooktime)
        var ct = this.state.cookingTimeEval[this.props.cooktime[this.props.cooktime.length - 1]].label
        console.log("diff: ", diff);
        this.setState({
            difficulty: e.target.value
          }, () => {
            this.props.updateDifficulty(diff)
              this.setState({params: {difficulty: pass_prop, cuisine: c, course: crse, ingredients: ings, cooktime:ct}}, () => {
                  console.log("param update new: ", this.state.params)
                  this.props.getFilteredRecipes(this.state.params).then(
                      console.log("a")
                  )
              })
          });
      }

    //   setting the course, making fetch call for corresponding filtered recipes
    
      onCourseChange(e) {
          this.setState({
          selectedCourse: e.target.value
        });

        var course = e.target.value;
        var c = this.props.cuisines
        var ings = this.props.ingredients
        var ct = this.state.cookingTimeEval[this.props.cooktime[this.props.cooktime.length - 1]].label
        var d = this.state.marks[this.props.difficulty[this.props.difficulty.length-1]].label
        this.props.updateCourse(course);

        this.setState({params: {course: course,
            cuisine: c, ingredients: ings, cooktime: ct, diffficulty: d

        }}, () => {

            this.props.getFilteredRecipes(this.state.params).then(
                () => {
                    console.log(" i updated the params and heres the state now: ", this.state)
                    console.log("value retention check!!!!: ", course)
                    this.setState({selectedCourse: course})
                }
            )


        }); 
       
      }

    // cuisine filtering, same process as course, fetch call for corresponding cuisine
    onCuisineChange(e){
        // if it's checked, uncheck it 
        console.log("event target val:", e.target.value)
        var ings = this.props.ingredients
        var ct = this.state.cookingTimeEval[this.props.cooktime[this.props.cooktime.length - 1]].label
        var d = this.state.marks[this.props.difficulty[this.props.difficulty.length-1]].label
        var crse = this.props.course[this.props.course.length - 1]
        if(this.props.cuisines.includes(e.target.value)){
            // call delete and remove filter
            var c = e.target.value;
           
            var q_cuisines = this.props.cuisines.filter((cuisine) => cuisine !== c);

            this.setState({selectedCuisine: this.state.selectedCuisine.filter(function(cuisine) { 
                return cuisine !== e.target.value 
            })}, () => {

                this.props.removeCuisines(c)
                    this.setState({params: {cuisine: q_cuisines,
                        course: crse, ingredients: ings, cooktime: ct, difficulty: d

                    }}, () => {
                   

                        this.props.getFilteredRecipes(this.state.params).then(
                            () => {
                                // console.log(" i updated the params and heres the state now: ", this.state)
                                // console.log("value retention check!!!!: ", cuisines)
                                this.setState({selectedCuisine: this.props.cuisines});
                                // this.state.selectedCuisine = this.props.cuisines;
                            })})
                        
                        // checkboxes need to be on!!!

                

                })
        }
        else{
            // call add and add filter
            this.setState({ selectedCuisine: [...this.state.selectedCuisine, e.target.value] }, () => {
                console.log("check for correct state passing: ", this.state.selectedCuisine)
                var c = e.target.value;
                this.props.addCuisines(c);
                var q_cuisines = this.props.cuisines;
                q_cuisines.push(e.target.value)

                this.setState({params: {cuisine: q_cuisines,
                    course: crse, ingredients: ings, cooktime: ct, difficulty: d
                
                }}, () => {

                    var cuisines = this.state.selectedCuisine
                    // console.log("value retention check!!!!: ", cuisines)
                    console.log("filter params:", this.state.params)
                   
                    console.log(this.props.cuisines);

                    this.props.getFilteredRecipes(this.state.params).then(
                        () => {
                            console.log(" i updated the params and heres the state now: ", this.state)
                            console.log("value retention check!!!!: ", cuisines)
                            // change to setstate
                            this.setState({selectedCuisine: cuisines});
                        })
                    })
                

            })

        }
      
    }

    onIngredientChange(e){
        // if it's checked, uncheck it 
        console.log("event target val:", e.target.value)
        var ct = this.state.cookingTimeEval[this.props.cooktime[this.props.cooktime.length - 1]].label
        console.log(this.props.difficulty[this.props.difficulty.length-1])
        var d = this.state.marks[this.props.difficulty[this.props.difficulty.length-1]].label
        var crse = this.props.course[this.props.course.length - 1]
        var cus = this.props.cuisines
        if(this.props.ingredients.includes(e.target.value)){
            // call delete and remove filter
            var c = e.target.value;
            var q_ingredients = this.props.ingredients.filter((ingredient) => ingredient !== c);

            this.setState({selectedIngredients: this.state.selectedIngredients.filter(function(ingredient) { 
                return ingredient !== e.target.value 
            })}, () => {

                this.props.removeIngredients(c)
                    this.setState({params: {ingredients: q_ingredients,
                        difficulty: d, cooktime: ct, course: crse, cuisine: cus
                    
                    }}, () => {
                   

                        this.props.getFilteredRecipes(this.state.params).then(
                            () => {
                                // console.log(" i updated the params and heres the state now: ", this.state)
                                // console.log("value retention check!!!!: ", cuisines)
                                this.setState({selectedIngredients: this.props.ingredients})
                            })})
                        
                        // checkboxes need to be on!!!

                

                })
        }
        else{
            // call add and add filter
            this.setState({ selectedIngredients: [...this.state.selectedIngredients, e.target.value] }, () => {
                console.log("check for correct state passing: ", this.state.selectedIngredients)
                var c = e.target.value;
                this.props.addIngredients(c);
                var q_ingredients = this.props.ingredients;
                console.log("qings:", q_ingredients)
                q_ingredients.push(e.target.value)

                this.setState({params: {ingredients: q_ingredients,
                    difficulty: d, cooktime: ct, course: crse, cuisine: cus
                
                }}, () => {

                    var ingredients = this.state.selectedIngredients
                    // console.log("value retention check!!!!: ", cuisines)
                    console.log("filter params:", this.state.params)
                   
                    console.log(this.props.ingredients);

                    this.props.getFilteredRecipes(this.state.params).then(
                        () => {
                            console.log(" i updated the params and heres the state now: ", this.state)
                            // change to setstate
                            this.setState({selectedIngredients: ingredients})
                        })
                    })
                

            })

        }


    }

    // Handler for the Search Bar Querying
    handleSearch(key) {
        this.setParamState(key, "title");
        
    }

    

    render() {
        return(
            <div className={styles.landingContainer}>
                <div className={styles.mainFilterSection}>

                    <div className={styles.filterUpstairs}>

                    <div className={styles.filterHeaders}>

                    <h5 className={styles.filterHeader}>Filter Recipes</h5>
                    <h6 className={styles.filterSubHeader}>(scroll for more!)</h6>

                    </div>

                    <div className={styles.resetFilters}>
                        <Button className={styles.clearButton} onClick={this.clearAll}>
                            <div className={styles.resetBtn}>
                            <i className="fa-solid fa-arrow-rotate-right"></i>

                            </div>
                       
                        Clear
                        </Button>

                    </div>


                    </div>

                    
                   
                    

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
                                checked={this.props.course[this.props.course.length -1] === "Appetizer"}
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
                                checked={this.props.course[this.props.course.length -1] === "Entree"}
                                onChange={this.onCourseChange}
                                />
                                Entree
                            </label>
                            </div>

                            </span>
                            
                            <span className={styles.twoRadioButtons2}>

                            <div className={styles.radioButton} id="radio-button-bev">
                            <label>
                                <input
                                type="radio"
                                value="Beverage"
                                checked={this.props.course[this.props.course.length -1] === "Beverage"}
                                onChange={this.onCourseChange}
                                />
                                Beverage
                            </label>
                            </div>

                           


                            <div className={styles.radioButtonDessert} id="radio-button-dessert">
                            <label>
                                <input
                                type="radio"
                                value="Dessert"
                                checked={this.props.course[this.props.course.length -1] === "Dessert"}
                                onChange={this.onCourseChange}
                                />
                                Dessert
                            </label>
                            </div>

                            
                            </span>

                            <span className={styles.twoRadioButtons3}>

                            <div className={styles.radioButton} id="radio-button-main">
                            <label>
                                <input
                                type="radio"
                                value="Main"
                                checked={this.props.course[this.props.course.length -1] === "Main"}
                                onChange={this.onCourseChange}
                                />
                                Main
                            </label>
                            </div>

                           


                            <div className={styles.radioButtonAllRecipes} id="radio-button-all">
                            <label>
                                <input
                                type="radio"
                                value=""
                                checked={this.props.course[this.props.course.length -1] === ""}
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
                                checked={this.props.cuisines.includes("Asian")}
                                onChange={this.onCuisineChange}
                                />
                                Asian
                            </label>
                        </div>

                        <div className={styles.CheckBoxCuisineItalian}>
                            <label>
                                <input
                                type="checkbox"
                                value="Italian"
                                checked={this.props.cuisines.includes("Italian")}
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
                                checked={this.props.cuisines.includes("French")}
                                onChange={this.onCuisineChange}
                                />
                                French
                            </label>
                        </div>

                        <div className={styles.CheckBoxCuisineIndian}>
                            <label>
                                <input
                                type="checkbox"
                                value="Indian"
                                checked={this.props.cuisines.includes("Indian")}
                                onChange={this.onCuisineChange}
                                />
                                Indian
                            </label>
                        </div>


                        </span>

                        

                        <span className={styles.twoRadioButtons1}>

                        <div className={styles.CheckBoxCuisine}>
                            
                                <input
                                className={styles.CheckBoxCuisineInput}
                                type="checkbox"
                                value="Western"
                                checked={this.props.cuisines.includes("Western")}
                                onChange={this.onCuisineChange}
                                />
                                <label className={styles.CheckBoxCuisineLabel}>
                                Western
                            </label>
                        </div>

                        <div className={styles.CheckBoxCuisineOther}>
                            <label>
                                <input
                                type="checkbox"
                                value="Other"
                                checked={this.props.cuisines.includes("Other")}
                                onChange={this.onCuisineChange}
                                />
                                All
                            </label>
                        </div>



                        </span>
                      

                       

                    </div>
                   

                    {/* Difficulty Filter */}
                    <div className={styles.courseFilter}>
                    <h6>Max Difficulty</h6>

                    {/* https://www.geeksforgeeks.org/range-slider-using-material-ui-in-react/ */}
                    <div className={styles.DifficultySlider}>
                    <Slider id="difficulty-slider"
                    // getAriaLabel={() => 'Difficulty Level'}
                    sx={{
                        color: "#d1c0c4",
                        // height: "5"
                        // width: "10px",
                        '& .MuiSlider-thumb': {
                            width: "1rem",
                            height: "1rem"
                          },
                          '& .MuiSlider-tooltip': {
                            width: "50rem",
                            height: "1rem"
                          }
                    }}
                    // onChange={this.onDifficultyChange}
                    onChangeCommitted={this.onDifficultyChange}
                    max={4}
                    aria-labelledby="discrete-slider"
                    key={`slider-${this.props.difficulty[this.props.difficulty.length - 1]}`}
                    defaultValue={this.props.difficulty[this.props.difficulty.length - 1]}
                    // value={this.props.difficulty}
                    marks={this.state.marks}
                   
                    
                    />

                    </div>
                    

                    </div>

                    {/* Cooking Time Filter */}
                    <div className={styles.courseFilter}>
                    <h6>Max Cooking Time (mins)</h6>

                      {/* https://www.geeksforgeeks.org/range-slider-using-material-ui-in-react/ */}
                      <div className={styles.DifficultySlider}>
                    <Slider
                    // getAriaLabel={() => 'Difficulty Level'}
                    sx={{
                        color: "#d1c0c4",
                        '& .MuiSlider-thumb': {
                            width: "1rem",
                            height: "1rem"
                          },
                    }}
                    onChangeCommitted={this.onCookTimeChange}
                    key={`slider-${this.props.cooktime[this.props.cooktime.length - 1]}`}
                    defaultValue={this.props.cooktime[this.props.cooktime.length - 1]}
                    max={5}
                    aria-labelledby="discrete-slider"
                    marks={this.state.cookingTime}
                    // marks={[{one: 1}, {two: 2}, {two: 3}, {two: 4}, {two: 5}]}
                   
                    
                    />

                    </div>

                    </div>

                    {/* Ingredients Filter */}
                    <div className={styles.courseFilter}>
                    <h6 className={styles.ingHeader}>Ingredients</h6>

                    <p className={styles.ingredientCategoryHeader}>Meats</p>
                    <span className={styles.twoRadioButtons1}>

                        <div className={styles.CheckBoxIngredients}>
                            <label>
                                <input
                                type="checkbox"
                                value="Chicken"
                                checked={this.props.ingredients.includes("Chicken")}
                                onChange={this.onIngredientChange}
                                />
                                Chicken
                            </label>
                        </div>

                        <div className={styles.CheckBoxIngredientsBeef}>
                            <label>
                                <input
                                type="checkbox"
                                value="Beef"
                                checked={this.props.ingredients.includes("Beef")}
                                onChange={this.onIngredientChange}
                                />
                                Beef
                            </label>
                        </div>
                        </span>
                        <span className={styles.twoRadioButtons1}>

                            <div className={styles.CheckBoxIngredients}>
                                <label>
                                    <input
                                    type="checkbox"
                                    value="Pork"
                                    checked={this.props.ingredients.includes("Pork")}
                                    onChange={this.onIngredientChange}
                                    />
                                    Pork
                                </label>
                            </div>

                            <div className={styles.CheckBoxIngredientsFish}>
                                <label>
                                    <input
                                    type="checkbox"
                                    value="Fish"
                                    checked={this.props.ingredients.includes("Fish")}
                                    onChange={this.onIngredientChange}
                                    />
                                    Fish
                                </label>
                            </div>
                            </span>

                            <p className={styles.ingredientCategoryHeader}> Vegetables</p>

                            <span className={styles.twoRadioButtons1}>

                            <div className={styles.CheckBoxIngredients}>
                                <label>
                                    <input
                                    type="checkbox"
                                    value="Mushroom"
                                    checked={this.props.ingredients.includes("Mushroom")}
                                    onChange={this.onIngredientChange}
                                    />
                                    Mushroom
                                </label>
                            </div>

                            <div className={styles.CheckBoxIngredientsCarrot}>
                                <label>
                                    <input
                                    type="checkbox"
                                    value="Carrot"
                                    checked={this.props.ingredients.includes("Carrot")}
                                    onChange={this.onIngredientChange}
                                    />
                                    Carrot
                                </label>
                            </div>
                            </span>

                            <span className={styles.twoRadioButtons1}>

                            <div className={styles.CheckBoxIngredients}>
                                <label>
                                    <input
                                    type="checkbox"
                                    value="Brocolli"
                                    checked={this.props.ingredients.includes("Brocolli")}
                                    onChange={this.onIngredientChange}
                                    />
                                    Brocolli
                                </label>
                            </div>

                            <div className={styles.CheckBoxIngredientsPotato}>
                                <label>
                                    <input
                                    type="checkbox"
                                    value="Potato"
                                    checked={this.props.ingredients.includes("Potato")}
                                    onChange={this.onIngredientChange}
                                    />
                                    Potato
                                </label>
                            </div>
                            </span>

                            <span className={styles.twoRadioButtons1}>

                            <div className={styles.CheckBoxIngredients}>
                                <label>
                                    <input
                                    type="checkbox"
                                    value="Tomato"
                                    checked={this.props.ingredients.includes("Tomato")}
                                    onChange={this.onIngredientChange}
                                    />
                                    Tomato
                                </label>
                            </div>

                            <div className={styles.CheckBoxIngredientsOnion}>
                                <label>
                                    <input
                                    type="checkbox"
                                    value="Onion"
                                    checked={this.props.ingredients.includes("Onion")}
                                    onChange={this.onIngredientChange}
                                    />
                                    Onion
                                </label>
                            </div>
                            </span>

                            <p className={styles.ingredientCategoryHeader}> Miscellaneous</p>
                            <span className={styles.twoRadioButtons1}>

                            <div className={styles.CheckBoxIngredients}>
                                <label>
                                    <input
                                    type="checkbox"
                                    value="Garlic"
                                    checked={this.props.ingredients.includes("Garlic")}
                                    onChange={this.onIngredientChange}
                                    />
                                    Garlic
                                </label>
                            </div>

                            <div className={styles.CheckBoxIngredientsGinger}>
                                <label>
                                    <input
                                    type="checkbox"
                                    value="Ginger"
                                    checked={this.props.ingredients.includes("Ginger")}
                                    onChange={this.onIngredientChange}
                                    />
                                    Ginger
                                </label>
                            </div>
                            </span>

                            <span className={styles.twoRadioButtons1}>

                            <div className={styles.CheckBoxIngredients}>
                                <label>
                                    <input
                                    type="checkbox"
                                    value="Spaghetti"
                                    checked={this.props.ingredients.includes("Spaghetti")}
                                    onChange={this.onIngredientChange}
                                    />
                                    Spaghetti
                                </label>
                            </div>

                            <div className={styles.CheckBoxIngredientsRice}>
                                <label>
                                    <input
                                    type="checkbox"
                                    value="Rice"
                                    checked={this.props.ingredients.includes("Rice")}
                                    onChange={this.onIngredientChange}
                                    />
                                    Rice
                                </label>
                            </div>
                            </span>



                    </div>
                   
                </div>



                <div className={styles.mainRecipeSection}>
                <div className={styles.topCategories}>
                    <div className={styles.addDiv}>

                    <div className={styles.addBtn}>
                        <Link to="/recipes/newrecipe">
                            <i className="fa-regular fa-square-plus"></i> 
                        </Link>
                    </div>
                    <h6 className={styles.addHeader}>Add a Recipe!</h6>

                    </div>
                    
                    {/* <div className={styles.categoryButtons}> */}
                        {/* all, quick fix and desserts */}
                        {/* <Button className={styles.categoryButton}>All Recipes</Button> */}
                        {/* <Button className={styles.categoryButton}>Quick Fix</Button> */}
                        {/* <Button className={styles.categoryButton}>Desserts</Button> */}
                    {/* </div> */}

                    <div className={styles.barDiv}>
                        <SearchBar className={styles.searchBar} placeholder="Search for a recipe"
                        value={this.state.search}
                        onChange={(newValue) => this.setState({ search: newValue }, () => console.log("logged: ", this.state.search))}
                        onRequestSearch={() => this.handleSearch(this.state.search)}
                        onCancelSearch={() => this.handleSearch("")}
                        ></SearchBar>
                    </div>

                </div>

                <div className={styles.secondaryHead}>
                    <h6 className={styles.TodayCook}>Today, I'll be Cooking:</h6>
                <div className={styles.sortDropDown}>

                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret className={styles.dropDownComp}>
                Filter By
                </DropdownToggle>
                <DropdownMenu>
                <DropdownItem onClick={this.onSortChange} className={styles.sortButton} value='Date'>Date (Most Recent)</DropdownItem>
                <DropdownItem onClick={this.onSortChange} className={styles.sortButton} value='Difficulty'>Difficulty (High to Low)</DropdownItem>
                </DropdownMenu>
                </Dropdown>



                </div>

                </div>
               
               
                <RecipesPageCardGroup users={this.props.users} comments={this.props.comments} all_recipes={this.props.recipes}/>

    
            </div>

            </div>
            
        )
    }
}


const mapStateToProps = state => {
    return {
        recipes: state.Recipes.filtered_recipes,
        cuisines: state.Recipes.cuisines,
        ingredients: state.Recipes.ingredients,
        difficulty: state.Recipes.difficulty,
        cooktime: state.Recipes.cooktime,
        course: state.Recipes.course,
        sort: state.Recipes.sort,
    }

}

const mapDispatchToProps = (dispatch, params, cuisine, ingredient, diff, ct, course, sort) => ({
    getFilteredRecipes: (params) => dispatch(getFilteredRecipes(params)),
    addCuisines: (cuisine) => dispatch(addCuisines(cuisine)),
    removeCuisines: (cuisine) => dispatch(removeCuisines(cuisine)),
    addIngredients: (ingredient) => dispatch(addIngredients(ingredient)),
    removeIngredients: (ingredient) => dispatch(removeIngredients(ingredient)),
    updateDifficulty: (diff) => dispatch(updateDifficulty(diff)),
    updateCookTime: (ct) => dispatch(updateCookTime(ct)),
    updateCourse: (course) => dispatch(updateCourse(course)),
    updateSort: (sort) => dispatch(updateSort(sort)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeLanding);
