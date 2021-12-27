import React from 'react';
import Authnavbar from '../components/Navbars/AuthNavbar'
import { Container, Row, Col } from "reactstrap";
const UserLayout = ({className, children}) => (
    <div className="main-content">
     <Authnavbar/>
      <div className="header bg-gradient-orange py-7 py-lg-8">
        <Container>
          <div className="header-body text-center mb-7">
          <Row className="justify-content-center" >
              <Col style={{marginTop:'15px'}}>
                <h1 className="text-dark" style={{fontSize:'40px'}}> אחזקה עד אליך  </h1> 
                <p className="text-lead text-dark">
                 אגד האחזקה הארצי
                </p>
              </Col>
            </Row>
          </div>
        </Container>
       
        
      </div>
      {/* Page content */}
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
        <div className={className}>{children}</div>
        </Row>
      </Container>
    </div>
);
export default UserLayout;