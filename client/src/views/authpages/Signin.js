import React, { useState } from 'react';
import { signin, authenticate, isAuthenticated } from '../../auth/index';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Card,
  CardHeader,
  Container,
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
import Unregisteredlayout from '../../layouts/Unregister';




export default function Signin() {
  const [values, setValues] = useState({
    personalnumber: '',
    password: '',
    errortype: '',
    error: false,
    successmsg: false,
    loading: false,
    redirectToReferrer: false,
  })
  const { personalnumber, password, error, loading, redirectToReferrer } = values
  const { user } = isAuthenticated()
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }
  const clickSubmit = (event) => {
    event.preventDefault()
    setValues({ ...values, loading: true, successmsg: false, error: false })
    signin({ personalnumber, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, errortype: data.error, loading: false, error: true })
        } else {
          authenticate(data, () => {
            setValues({ ...values, loading: false, error: false, successmsg: true, redirectToReferrer: true })
          })
        }
      })
  }
  /*   const showError = () => (
     
  ) */

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 2) {
        return <Redirect to="subadmin/dashboard" />;
      } else if(user && user.role === 1){
        return <Redirect to="admin/dashboard" />;
      } else{
        return <Redirect to="/" />
      }
    }
  }

  const showSuccess = () => (
    <div className="alert alert-info " style={{ textAlign: 'right', display: values.successmsg ? '' : 'none' }}>
      <h2>נרשם בהצלחה</h2>
    </div>
  )
  const showError = () => (
    <div className="alert alert-danger" style={{ textAlign: 'right', display: values.error ? '' : 'none' }}>
      <h2>שגיאה בשליחת הטופס</h2>
      <h2>{values.errortype}</h2>
    </div>

  )
  const showLoading = () => (
    <div className="alert alert-success" style={{ textAlign: 'right', display: values.loading ? '' : 'none' }}>
      <h2>{"בטעינה"}</h2>
    </div>
  )

  const signInForm = () => (
    <>
      <Container className="pb-5">
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary shadow border-0">

              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>התחברות</small>
                </div>
                <Form role="form" >
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input onChange={handleChange('personalnumber')} placeholder="מספר אישי" type="string" value={personalnumber} />

                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input onChange={handleChange('password')} placeholder="סיסמא" type="password" value={password} />
                    </InputGroup>
                  </FormGroup>

                  <div className="text-center">
                    <button onClick={clickSubmit} className="btn btn-primary">התחבר</button>
                  </div>
                </Form>
              </CardBody>
            </Card>

          </Col>
        </Row>
      </Container>
    </>
  )


  return (
    <div>
      <Unregisteredlayout />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col>
            {showLoading()}
            {showSuccess()}
            {showError()}
            {signInForm()}
            {redirectUser()}
          </Col>
        </Row>
      </Container>
    </div>
  )
}