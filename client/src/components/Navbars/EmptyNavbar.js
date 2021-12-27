import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
const Authnavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="white" light expand="md"  >
      <img style={{height: "50px"}} alt="..." src={require("assets/img/theme/logo.png")}/>
      <img className="mr-3" style={{height: "50px"}} alt="..." src={require("assets/img/theme/logobhd20.png")}/>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
        <button
            className="navbar-toggler"
            type="button"
            onClick={toggle}>
            <span className="navbar-toggler-icon" />
          </button>
          <Nav className="mr-auto" navbar >
          </Nav>
          <div>
<img style={{height: "50px"}} alt="..." src={require("assets/img/theme/LOGO1.png")}/>
          </div> 
        </Collapse>
      </Navbar>
    </div>
  );
}
export default Authnavbar; 