import React, {useState, useEffect} from 'react'
import {isAuthenticated} from '../auth/index';
import {Link, Redirect} from 'react-router-dom';
import {createTipul, getEgadtypes} from '../useractions/AddTipul';
import {updateTipul, getTipul} from './apiAdmin';
import EmptyHeader from "components/Headers/EmptyHeader.js";

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
  
const UpdateTipul = ({match}) => {
    const{ user, token} = isAuthenticated();
    const [values, setValues] = useState({
        tipuldate:'',
        cartype:'',
        egadtypes:[],
        egadtypeid:'',
        tipultype:'',
        carnum:'',
        status:'',
        loading:false,
        error:false,
        createdTipul:'',
        redirectToProfile: false,
        formData:''    
    })
const {
    tipuldate,
    cartype,
    egadtypes,
    egadtypeid,
    tipultype,
    carnum,
    status,
    loading,
    error,
    createdTipul,
    redirectToProfile,
    formData
   


} = values;
const init = (tipulId) => {
  getTipul(tipulId).then(data =>{
    if(data.error) {
      setValues({...values, error:data.error})
    } else {
      //populate the state
      setValues({...values,
        tipuldate:data.tipuldate,
        cartype:data.cartype,
        egadtypeid:data.egadtypeid._id,
        tipultype:data.tipultype,
        carnum:data.carnum,
        formData: new FormData()
        })
      //load egedtypes
      initEgadtypes()
    }
  })
}
// load categories and set from data
const initEgadtypes = () => {
  getEgadtypes().then(data => {
        if(data.error) {
            setValues({...values, error:data.error})
        } else {
            setValues({egadtypes:data, formData: new FormData()})
        }
    })
}

useEffect(() => {
    init(match.params.tipulId);
}, [])

const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value
    formData.set(name,value)
    setValues({...values, [name]: value})
}
const clickSubmit = event => {
    event.preventDefault();
    setValues({...values, error:'', loading:true});
    
    updateTipul(match.params.tipulId,user._id, token, formData)
    .then(data => {
        if(data.error) {
            setValues({...values, error:data.error})
        } else {
           setValues({
               ...values,
                tipuldate:'',
                cartype:'',
                egadtypeid:'',
                tipultype:'',
                carnum:'',
                status:'',
                loading:false,
                error:false,
                redirectToProfile:true,
                createdTipul:user._id
           }) 
        }
    })
}
const newPostForm = () => (
    <Col>
      <CardBody className="justify-content-center">
                <div className="text-center text-muted mb-4">
                  <h3>שינוי סטטוס</h3><hr/>
                 
                 

                </div>
               
              </CardBody>
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-5">
               <form className ="mb-3" onSubmit={clickSubmit}>
               <FormGroup dir="rtl" >
                  <div text align="right"><small ></small></div>
                   
                      <InputGroupAddon addonType="prepend">
                      </InputGroupAddon>
                      <div text align="right">
                        
                        <select className="custom-select" value= {status} onChange={handleChange('status')}>
                        <option value="">בחר סטטוס</option>
                        <option value="מאושר">מאושר</option>
                        <option value="נדחה">נדחה</option>
                      
                         
                        </select>
                      </div>   
                   
                  </FormGroup>
               <FormGroup>
                  
                  <Input
                    value= {tipuldate}
                    onChange={handleChange('tipuldate')}
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
                        
                        <select className="custom-select" value= {cartype} onChange={handleChange('cartype')}>
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
                        
                        <select className="custom-select" value= {tipultype} onChange={handleChange('tipultype')}>
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
                        
                        <select className="custom-select" value= {egadtypeid} onChange={handleChange('egadtypeid')}>
                        <option value="">בחר מתקן אחזקה</option>
                        {egadtypes && 
            egadtypes.map((c, i) => (
                <option key ={i} value={c._id}>{c.name}</option>
        ))}

                        
                         
                        </select>
                      </div>   
                   
                  </FormGroup>


                  <FormGroup dir="rtl" >
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      
                    </InputGroupAddon>
                    <Input placeholder="מספר צ'" type="textarea" value= {carnum} onChange={handleChange('carnum')}/>
                  </InputGroup>
                </FormGroup>
        <div style={{textAlign:'right'}}>
        <button className="btn btn-primary" > עדכן טיפול</button>
        </div>
      
    </form>
              </CardHeader>
              
            </Card>
          </Col>
)
const goBack = () =>( /*need to be fixed*/ 
    <div className="mt-5">
        <Link to ="/admin/managetipuls" className="text-danger">חזור אחורה</Link>
    </div>
  )
  const showSuccess = () =>(
   
         <div className="alert alert-info" style={{textAlign:'right',display: createdTipul ? '' : 'none' }}>
            <h2>הטיפול נשלח בהצלחה</h2>
            <h3>הטיפול עודכן בהצלחה </h3>
            <Link to='/admin/managetipuls'>לכל הטיפולים</Link>
            
        </div>
    
  )
const showError = () =>(

       <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
           <h2>{error}</h2>
       </div>
 
)
const showLoading= () => (
    loading && (
        <div className="alert alert-success">
            <h2>נטען...</h2>
        </div>
    )
)
const redirectUser= () => {
  if(redirectToProfile){
    if(!error) {
      return <Redirect to='/admin/managetipuls'/>
    }
  }
}
    return (
      <>
      <EmptyHeader/>
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
      
           <Col>
            <div className="col-md-12">
            {showLoading()}
            {showSuccess()}   
            {showError()}
            {redirectUser()}
            {newPostForm()}
           {/* {goBack()} */}
          </div>
          </Col>
        </Row>
      </Container>
      
     </>
    )
}
export default UpdateTipul;
