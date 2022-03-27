import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarToggler, Collapse } from 'reactstrap';

import './App.css';

import LoginMain from './components/Login/LoginMain/index';
import AdminPage from './components/Admin/index';
import Landing from './components/Landing';
import Users from './components/Users/Users';
import ScrollToTop from './components/ScrolltoTop';
import RecipeBrowser from './components/recipeView/RecipeBrowserComponent';
import WriteRecipe from './components/recipeForms/WriteRecipeComponent';
import ForkRecipe from './components/recipeForms/ForkRecipeComponent';
import FlagDesc from './components/Admin/FlagDesc';

import { getRecipes, postRecipe, editRecipe, deleteRecipe } from './redux/recipePage/recipe-actions';

const mapStateToProps = state => {
  return {
    Recipes: state.Recipes
  }
}

const mapDispatchToProps = dispatch => ({
  getRecipes: () => {dispatch(getRecipes())},
  postRecipe: (author, parent, title, description, ingredients, steps, difficulty, course, cuisine, preptime, cooktime, servings, image) => {dispatch(postRecipe(author, parent, title, description, ingredients, steps, difficulty, course, cuisine, preptime, cooktime, servings, image))},
  editRecipe: (_id, author, parent, title, description, ingredients, steps, difficulty, course, cuisine, preptime, cooktime, servings, image) => {dispatch(editRecipe(_id, author, parent, title, description, ingredients, steps, difficulty, course, cuisine, preptime, cooktime, servings, image))},
  deleteRecipe: (id) => {dispatch(deleteRecipe(id))}
});

class App extends React.Component {
  state = {
    isOpen: false,
    currentUser: {username: null, password: null, email: null, name: null, admin: false}
  };

  componentDidMount() {
    console.log("component mounting")
    this.props.getRecipes();
    console.log(this.props.Recipes)
  }
  
  render() {
    return(
      <div id="container">
        <BrowserRouter>
          <Navbar light expand="md" className='navBar'>
            <NavbarBrand><Link to="/">CookingHS</Link></NavbarBrand>
            <NavbarToggler onClick={() => { this.setState({isOpen: !this.state.isOpen}) }} />
            <Collapse className='navItems' isOpen={this.state.isOpen} navbar>
                    <Nav  navbar>
                        <NavItem>
                            <NavLink><Link to="/login">Login</Link></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink><Link to="/recipes">Recipes</Link></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink><Link to="/users">Users</Link></NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
          </Navbar>
          <ScrollToTop>
            <Routes>
              <Route exact path="/admin" element={<AdminPage />}/>  
              <Route exact path="/login" element={<LoginMain
                                                  currentUser={this.state.currentUser}/>}/>
              <Route exact path="/recipes/:id" element={<RecipeBrowser />}/>
              <Route exact path="/admin/:id" element={<FlagDesc />}/>
              <Route exact path="/recipes" element={<RecipeBrowser recipes={this.props.Recipes}/>}/>
              <Route exact path="/writerecipe" element={<WriteRecipe />}/>
              <Route exact path="/forkrecipe" element={<ForkRecipe />}/>
              <Route exact path="/users" element={<Users />}/>
              <Route exact path="/" element={<Landing />}/>
            </Routes>
          </ScrollToTop>

        </BrowserRouter>
        <footer id="footer">
          
        </footer>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
