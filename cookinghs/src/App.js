import React from 'react';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarToggler, Collapse } from 'reactstrap';

import './App.css';

import LoginMain from './components/Login/LoginMain/index';
import Landing from './components/Landing';
import Recipes from './components/Recipes';
import Users from './components/Users';

class App extends React.Component {
  state = {
    isOpen: false
  };
  
  render() {
    return(
      <div>
        <BrowserRouter>
          <Navbar color="light" light expand="md">
            <NavbarBrand><Link to="/">CookingHS</Link></NavbarBrand>
            <NavbarToggler onClick={() => { this.setState(this.isOpen = !this.isOpen) }} />
            <Collapse isOpen={this.isOpen} navbar>
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
          <Routes>
            <Route exact path="/login" element={<LoginMain />}/>
            <Route exact path="/recipes" element={<Recipes />}/>
            <Route exact path="/users" element={<Users />}/>
            <Route exact path="/" element={<Landing />}/>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }

}

export default App;
