import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { Link } from 'react-router-dom';

import { signout, isAuthenticated } from '../../auth/index';
import { Redirect } from 'react-router-dom';
import history from '../../history';
const SubadminNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="white" light expand="md"  >
        <img style={{ height: "50px" }} alt="..." src={require("assets/img/theme/logo.png")} />
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggle}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <Nav className="mr-auto" navbar >
        {/*  <NavItem >
              <NavLink><Link to="dashboard">לוז תאריכי</Link> </NavLink>
            </NavItem>
            <NavItem >
              <NavLink><Link to="dashboard">לוז יומי</Link> </NavLink>
            </NavItem>
            <NavItem >
              <NavLink><Link to="dashboard">היסטוריית טיפולים</Link> </NavLink>
            </NavItem>*/}
            <NavItem >
              <NavLink><Link to="monthlyschedule">לוז תאריכי</Link> </NavLink>
            </NavItem>
            <NavItem >
              <NavLink><Link to="dailyschedule">לוז יומי</Link> </NavLink>
            </NavItem>
              <NavItem >
              <NavLink><Link to="tipulshistory">היסטוריית טיפולים</Link> </NavLink>
            </NavItem>
            <NavItem >
              <NavLink><Link to="managetipuls">טיפולים</Link> </NavLink>
            </NavItem>
            <NavItem >
              <NavLink><Link to="dashboard">דף הבית</Link> </NavLink>
            </NavItem>
        

            <NavItem>
              <NavLink><Link onClick={() => signout(() => { history.push('/signin'); })} to="/signin">התנתק</Link></NavLink>
            </NavItem>

          </Nav>
          <div onClick={() => signout(() => (
            <Redirect to='signin' />
          ))}>
            <img style={{ height: "50px" }} alt="..." src={require("assets/img/theme/LOGO1.png")} />
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default SubadminNavbar;