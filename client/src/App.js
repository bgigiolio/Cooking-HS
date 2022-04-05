import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarToggler, Collapse } from 'reactstrap';
import axios from 'axios'; // new!!
import './App.css';


import LoginMain from './components/Login/LoginMain/index';
import AdminPage from './components/Admin/index';
import Landing from './components/Landing';
import Users from './components/Users/Users';
import ScrollToTop from './components/ScrolltoTop';
import RecipeBrowser from './components/recipeView/RecipeBrowserComponent';
import WriteWrapper from './components/recipeForms/WriteWrapperComponent';
import FlagDesc from './components/Admin/FlagDesc';
import defaultProfile from './defaultProfile.png'
import PublicUser from './components/Users/publicUser'
import { baseUrl } from './shared/baseUrl';
import { getRecipes, getFilteredRecipes } from './redux/recipePage/recipe-actions';
import { getUsers } from './redux/users/user-actions';
import { getComments } from './redux/comments/comment-actions';
import { getReports } from './redux/reports/report-actions';

const mapStateToProps = state => {
  return {
    Recipes: state.Recipes,
    Users: state.Users,
    Comments: state.Comments
  }
}

const mapDispatchToProps = dispatch => ({
  getRecipes: () => {dispatch(getRecipes())},
  // landing page filtering
  getFilteredRecipes: () => {dispatch(getFilteredRecipes())},
  getUsers: () => {dispatch(getUsers())},
  getComments: () => {dispatch(getComments())},
  getReports: () => {dispatch(getReports())}
});

class App extends React.Component {
  constructor(props) {
    axios.defaults.withCredentials = true
    super(props);
    this.state.currentUser = null
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
    axios.get(baseUrl + 'api/users/session', {params :{
      want : ["_id", "username", "admin", "fullName", "email", "profilePic"]
    }}).then( (response) => {
      this.state.currentUser = response.data
      this.state.profilePic = response.data.profilePic
      console.log(this.state.currentUser)
      this.forceUpdate();
    })
    .then( () => this.forceUpdate())
    .catch(function (error) {
      this.state.currentUser = null
    })
  }

  state = {
    isOpen: false,
    currentUser: null,
    profilePic: defaultProfile
  };

  componentDidMount() {
    console.log("app mounting")
    this.props.getRecipes();
    // landing
    this.props.getFilteredRecipes();
    this.props.getUsers();
    this.props.getComments();
    this.props.getReports();
  }
  logout(){
    axios.get(baseUrl + 'api/users/logout') //WIll need to change on deploy

    this.setState({
      currentUser: null
    }, () => console.log(this.state.currentUser))
  }
  updateCurrentUser(user){
    this.setState({
      currentUser : user,
      profilePic : user.profilePic
    }, () => console.log(this.state.currentUser))

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
                            {(this.state.currentUser !== null && this.state.currentUser.admin)
                            ? <NavLink><Link to="/admin">Admin</Link></NavLink>
                            : null}
                        </NavItem>
                        <NavItem>
                            <NavLink><Link to="/recipes">Recipes</Link></NavLink>
                        </NavItem>
                        <NavItem>
                            {this.state.currentUser === null 
                            ? <NavLink><Link to="/login/*">Log in</Link></NavLink> 
                            : <NavLink><Link to="/login/*" onClick={this.logout}>Sign out </Link></NavLink>}
                        </NavItem>
                        <NavItem>
                            {this.state.currentUser === null 
                            ? null 
                            : <NavLink><Link to="/users"><img alt="" className="profilePic" src={this.state.profilePic}/></Link></NavLink>}
                        </NavItem>
                    </Nav>
                </Collapse>
          </Navbar>
          <ScrollToTop>
            <Routes>
              <Route exact path="/login/*" element={<LoginMain currentUser={this.state.currentUser} updateCurrentUser={this.updateCurrentUser}/>}/>
              <Route exact path="/admin/:id" element={<FlagDesc comments={this.props.Comments} users={this.props.Users} recipes={this.props.Recipes}/>}/>
              <Route exact path="/admin" element={<AdminPage users={this.props.Users} recipes={this.props.Recipes} comments={this.props.Comments} />}/>  
              <Route exact path="/users/:id" element={<PublicUser profilePic = {this.state.profilePic}/>} />
              <Route exact path="/users" element={<Users currentUser={this.state.currentUser} profilePic = {this.state.profilePic}/>}/>
              <Route exact path="/recipes/newrecipe" element={<WriteWrapper flag={"new"} recipes={this.props.Recipes} user={this.state.currentUser}/>}/>
              <Route exact path="/recipes/:id/editrecipe" element={<WriteWrapper flag={"edit"} recipes={this.props.Recipes} user={this.state.currentUser}/>}/>
              <Route exact path="/recipes/:id/forkrecipe" element={<WriteWrapper flag={"fork"} recipes={this.props.Recipes} user={this.state.currentUser}/>}/>
              <Route exact path="/recipes/:id" element={<RecipeBrowser recipes={this.props.Recipes} users={this.props.Users} currentUser={this.state.currentUser}/>}/>
              <Route exact path="/recipes" element={<RecipeBrowser recipes={this.props.Recipes} users={this.props.Users} comments={this.props.Comments}/>}/>
              <Route exact path="/*" element={<Landing />}/>
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
