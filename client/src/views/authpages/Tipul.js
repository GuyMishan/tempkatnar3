import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../../auth/index';
import { Link } from 'react-router-dom';
import { createTipul, getEgadtypes, createOrder } from '../../useractions/AddTipul';
import { API } from '../../config';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Alert,
  Spinner,
  Label,
  Col
} from "reactstrap";
import UserLayout from 'layouts/Auth';
import axios from 'axios';

export default function RealTipul() {
  const { user, token } = isAuthenticated();
  const [data, setData] = useState({
    tipuldate: '',
    cartype: '',
    egadtypes: [],
    egadtypeid: '',
    tipultype: '',
    carnum: '',
    number: '',
    name: '',
    user: user,
    status: '',
    loading: false,
    error: false,
    createdTipul: '',
    errortype: '',
    redirectToProfile: false,
    formData: '',
    successmsg: false
  })
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };


  // load categories and set from data


  const handleChangedate = event => {
    setData({ ...data, tipuldate: event.target.value })
  }
  const handleChangenum = event => {
    setData({ ...data, number: event.target.value })
  }
  const handleChangecartype = event => {
    setData({ ...data, cartype: event.target.value })
  }
  const handleChangetipultype = event => {
    setData({ ...data, tipultype: event.target.value })
  }
  const handleChangeegadtypeid = event => {
    setData({ ...data, egadtypeid: event.target.value })
  }
  const handleChangecarnum = event => {
    setData({ ...data, carnum: event.target.value })
  }
  const clickSubmit = event => {
    event.preventDefault();
    setData({ ...data, loading: true, successmsg: false, error: false });
    const tipul = {
      tipuldate: data.tipuldate,
      cartype: data.cartype,
      egadtypeid: data.egadtypeid,
      tipultype: data.tipultype,
      carnum: data.carnum,
      number: data.number,
      user: data.user,




    }
    const userId = user._id
    axios.post(`/api/tipul/create/${userId}`, tipul, config)
      .then(res => {
        setData({ ...data, loading: false, error: false, successmsg: true })
        console.log(res.data);
      })
      .catch(error => {
        setData({
          ...data,
          errortype: error.response.data.error,
          loading: false,
          error: true
        });
      })
  }

  const newPostForm = () => (
    <Col >
      <CardBody className="justify-content-center">
        <div className="text-center text-muted mb-4">
          <h3>הזמנת טיפול</h3><hr />


        </div>

      </CardBody>
      <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-transparent pb-5">
          <form className="mb-3" onSubmit={clickSubmit}>



            <FormGroup dir="rtl" >
              <div text align="right"><small ></small></div>

              <InputGroupAddon addonType="prepend">
              </InputGroupAddon>
              <div text align="right">
                <Input placeholder='מספר נייד' value={data.number} onChange={handleChangenum} type='number'/>
              </div>
            </FormGroup>


            <FormGroup>

              <Input
                value={data.tipuldate}
                onChange={handleChangedate}
                type="date"
                placeholder="date placeholder"
              />
            </FormGroup>


            <Row form>
              <Col md={6}>
                <FormGroup dir="rtl" >
                  <div text align="right"><small ></small></div>

                  <InputGroupAddon addonType="prepend">
                  </InputGroupAddon>
                  <div text align="right">

                    <select className="custom-select" value={data.cartype} onChange={handleChangecartype} >
                      <option value="">בחר סוג רכב</option>
                      <option value="סופה">סופה</option>


                    </select>
                  </div>

                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup dir="rtl" >
                  <div text align="right"><small ></small></div>

                  <InputGroupAddon addonType="prepend">
                  </InputGroupAddon>
                  <div text align="right">

                    <select className="custom-select" value={data.tipultype} onChange={handleChangetipultype}>
                      <option value="">בחר סוג טיפול</option>
                      <option value="רכב טיפול מזדמן">רכב טיפול מזדמן</option>
                      <option value="רכב טיפול ייעודי מזדמן">רכב טיפול ייעודי מזדמן</option>
                      <option value="תקרייה">תקרייה</option>
                      <option value="טיפול קמ">טיפול ק"מ</option>
                      <option value="ביקורת חורף"> ביקורת חורף</option>


                    </select>
                  </div>

                </FormGroup>
              </Col>
            </Row>

            <FormGroup dir="rtl" >
              <div text align="right"><small ></small></div>

              <InputGroupAddon addonType="prepend">
              </InputGroupAddon>
              <div text align="right">

                <select className="custom-select" value={data.egadtypeid} onChange={handleChangeegadtypeid}>
                  <option value="">בחר מתקן אחזקה</option>


                  <option  value="5fb51a1a28bc4670c38a331a">נחשונים</option>




                </select>
              </div>

            </FormGroup>


            <FormGroup dir="rtl" >
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">

                </InputGroupAddon>
                <Input placeholder="מספר צ'"  type="number" value={data.carnum} onChange={handleChangecarnum} />
              </InputGroup>
            </FormGroup>
            <div style={{ textAlign: 'right' }}>
              <button className="btn btn-primary" > צור מוצר</button>
            </div>

          </form>
        </CardHeader>

      </Card>
    </Col>
  )
  const goBack = () => (
    <div className="mt-5">
      <Link to="/" className="text-danger">חזור אחורה</Link>
    </div>
  )
  const showSuccess = () => (

    <div className="alert alert-info" style={{ textAlign: 'right', display: data.successmsg ? '' : 'none' }}>
      <h2>הטיפול נשלח בהצלחה</h2>

      <Link to='mytipuls'>לטיפולים</Link>

    </div>

  )
  const showError = () => (

    <div className="alert alert-danger" style={{ textAlign: 'right', display: data.error ? '' : 'none' }}>
      <h2>שגיאה בשליחת הטופס</h2>
      <h2>{data.errortype}</h2>
    </div>

  )
  const showLoading = () => (
    <div className="alert alert-success" style={{ textAlign: 'right', display: data.loading ? '' : 'none' }}>
      <h2>{"בטעינה"}</h2>
    </div>
  )

  return (
    <>
      <UserLayout />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">

          <Col>
            <div className="col-md-12">
              {showLoading()}
              {showSuccess()}
              {showError()}
              {newPostForm()}
              {goBack()}
            </div>
          </Col>
        </Row>
      </Container>

    </>
  )
}