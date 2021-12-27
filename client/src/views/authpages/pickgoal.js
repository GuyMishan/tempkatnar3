import React from "react";
import history from '../../history';
import {signout, isAuthenticated} from '../../auth/index';
import UserLayout from '../../layouts/Auth';



// reactstrap components
import {
  Button,
  Card,
  Container,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const {user,token} = isAuthenticated()
   
   






    return (
      <>
      <UserLayout/>  
      <Container className="mt--8 pb-5">
            <Row className="justify-content-center">
            <Col lg="5" md="6">
            <Card className="bg-secondary shadow border-0">        
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
    <strong>שלום {user.name +' '+ user.lastname}</strong>
              </div>
              <Row style={{padding: "5px"}}>
              <Col>
              <Link to="tipul"  style={{color:"white"}}><Button color="warning" style={{width: "100%", height:"50px"}}>זימון תור לרכב באחזקה לבנה</Button></Link>
              </Col>
              </Row>
              <Row style= {{padding:"5px"}}>
              <Col><Button color="warning"  style={{width: "100%", height:"50px"}}>זימון תור לרכב באחזקה חומה</Button></Col>
              </Row>
              <Row style={{padding: "5px"}}>
              <Col>
              <Link to="tipul"  style={{color:"white"}}><Button color="warning" style={{width: "100%", height:"50px"}}>זימון גרר</Button></Link>
              </Col>
              <Col><Button color="warning"  style={{width: "100%", height:"50px"}}>חט"כ ומנועיה</Button></Col>
              </Row>
              <Row style={{padding: "5px"}}>
              <Col>
              <Link to="tipul"  style={{color:"white"}}><Button color="warning" style={{width: "100%", height:"50px"}}>תקריות</Button></Link>
              </Col>
              <Col><Button color="warning"  style={{width: "100%", height:"50px"}}>דירוג השירות</Button></Col>
              </Row>
              <div className="text-center text-muted mb-4">
                <hr></hr>
              </div>
              <Row style={{padding: "5px"}}>
              <Col><Link to="/mytipuls"  style={{color:"white"}}><Button color="warning" style={{width: "100%", height:"50px"}}>הזמנות שלי</Button></Link></Col>
              </Row>
              <div className="text-center text-muted mb-4">
                <hr></hr>
              </div>
              <Row style={{padding: "5px"}}>
              <Col><Link onClick = {() => signout(() => {history.push('/signin');})} to="/signin"  style={{color:"white"}}><Button color="dark" style={{width: "100%", height:"50px"}}> יציאה <i className="ni ni-settings-gear-65" /></Button></Link></Col>
              <Col><Link to="/userprofile"  style={{color:"white"}}><Button color="dark" style={{width: "100%", height:"50px"}}>פרופיל <i className="ni ni-single-02" /></Button></Link></Col>
              </Row>
            </CardBody>
          </Card>  
        </Col>
            </Row>
          </Container>
        
          
       
      </>
    );
       
    
  }

export default Home;