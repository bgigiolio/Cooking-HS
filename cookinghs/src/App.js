import React from 'react';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
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
import Login from './components/Login';
import FlagDesc from './components/Admin/FlagDesc';

class App extends React.Component {
  state = {
    isOpen: false
  };
  
  render() {
    return(
      <div style={{position: "relative", minHeight: "100vh"}}>
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
              <Route exact path="/login" element={<Login />}/>
              <Route exact path="/recipes/:id" element={<RecipeBrowser />}/>
              <Route exact path="/admin/:id" element={<FlagDesc />}/>
              <Route exact path="/recipes" element={<RecipeBrowser />}/>
              <Route exact path="/writerecipe" element={<WriteRecipe />}/>
              <Route exact path="/forkrecipe" element={<ForkRecipe />}/>
              <Route exact path="/users" element={<Users />}/>
              <Route exact path="/" element={<Landing />}/>
            </Routes>
          </ScrollToTop>

        </BrowserRouter>
        <footer style={{position: "absolute", bottom: 0}}>
          
        </footer>
      </div>
    )
  }
}

export default App;
