import React from 'react';
import { Container, Row, Col } from "reactstrap";
const UnregisteredLayout = ({className, children}) => (
    <div className="main-content">
   
      <div className="header bg-gradient-orange py-7 py-lg-8">
        <Container>
          <div className="header-body text-center mb-7">
            <Row className="justify-content-center" style={{margin: "30px"}}>
              <Col>
                <h1 className="text-white"> אחזקה עד אליך  </h1> 
                <p className="text-lead text-light">
                 אגד האחזקה הארצי
                </p>
              </Col>
              <Col style={{padding: "5px"}}><img style={{height: "100px"}} alt="..." src={require("assets/img/theme/logobhd20.png")} /></Col>
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
export default UnregisteredLayout;