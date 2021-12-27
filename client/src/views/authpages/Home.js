import React, { Component } from 'react'
import history from '../../history';
import {
    Button,
    Card,
    CardBody,
    Row,
    Col,
    Container
} from "reactstrap"
export default class Home extends Component {
  onPress = e => {
    history.push('/auth/signin');
}
onClick = e => {
  history.push('/auth/signup');
}
    render() {
        return (
            <>
            <Col lg="5" md="6">
              <Card className="bg-secondary shadow border-0">
                
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>בחר סוג ביקור</small>
                  </div>
                  <Row style={{padding: "5px"}}>
                  <Col><Button color="primary" onClick={this.onPress} style={{width: "100%"}}>התחברות</Button></Col>
                  <Col><Button color="primary"onClick={this.onClick} style={{width: "100%"}}>הרשמה</Button></Col>
                  </Row>
                </CardBody>
              </Card>
              <Row className="mt-3">
               
               
              </Row>
            </Col>
          </>
        )
    }
}
