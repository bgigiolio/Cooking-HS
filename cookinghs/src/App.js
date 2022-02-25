import React from 'react';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarToggler, Collapse } from 'reactstrap';

import './App.css';

import Login from './components/Login';
import Landing from './components/Landing';
import Recipes from './components/RecipesComponent';
import Users from './components/Users';
import ScrollToTop from './components/ScrolltoTop';
import WriteRecipe from './components/WriteRecipeComponent';

class App extends React.Component {
  state = {
    isOpen: false
  };
  
  render() {
    return(
      <div style={{position: "relative", minHeight: "100vh"}}>
        <BrowserRouter>
          <Navbar color="light" light expand="md">
            <NavbarBrand><Link to="/">CookingHS</Link></NavbarBrand>
            <NavbarToggler onClick={() => { this.setState({isOpen: !this.state.isOpen}) }} />
            <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="mr-auto" navbar>
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
              <Route exact path="/login" element={<Login />}/>
              <Route exact path="/recipes/:id" element={<Recipes />}/>
              <Route exact path="/recipes" element={<Recipes />}/>
              <Route exact path="/writerecipe" element={<WriteRecipe />}/>
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
