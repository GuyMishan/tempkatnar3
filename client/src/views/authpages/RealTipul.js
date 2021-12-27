import React, {useState, useEffect} from 'react'
import {isAuthenticated} from '../../auth/index';
import {Link} from 'react-router-dom';
import {createTipul, getEgadtypes, createOrder} from '../../useractions/AddTipul';
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
  
export default function RealTipul() {
    const{ user, token} = isAuthenticated();
    const [values, setValues] = useState({
        tipuldate:'',
        cartype:'',
        egadtypes:[],
        egadtype:'',
        tipultype:'',
        carnum:'',
        number:'',
        name:'',
        status:'',
        loading:false,
        error:'',
        createdTipul:'',
        redirectToProfile: false,
        formData:''    
    })
const {
    tipuldate,
    cartype,
    egadtypes,
    egadtype,
    tipultype,
    carnum,
    status,
    loading,
    name,
    number,
    error,
    createdTipul,
    formData
   


} = values;

// load categories and set from data
const init = () => {
  getEgadtypes().then(data => {
        if(data.error) {
            setValues({...values, error:data.error})
        } else {
            setValues({...values, egadtypes:data, formData: new FormData()})
        }
    })
}

useEffect(() => {
    init();
}, [])

const handleChange = name => event => {
  const value = name === 'photo' ? event.target.files[0] : event.target.value
    formData.set(name,value)
    setValues({...values, [name]: value})
}
const clickSubmit = event => {
  event.preventDefault();
  setValues({...values, error:'', loading:true});
  
  createTipul(user._id, token, formData)
  .then(data => {
      if(data.error) {
          setValues({...values, error:data.error})
      } else {
         setValues({
             ...values,
              tipuldate:'',
              cartype:'',
              egadtype:'',
              tipultype:'',
              carnum:'',
              status:'',
              number:'',
              number:'',
              loading:false,
              createdTipul:user._id
         }) 
      }
  })
}
const newPostForm = () => (
    <Col lg="6" md="8">
      <CardBody className="justify-content-center">
                <div className="text-center text-muted mb-4">
                  <h3>הזמנת טיפול</h3><hr/>
             

                </div>
               
              </CardBody>
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-5">
               <form className ="mb-3" onSubmit={clickSubmit}>
               <Row form>
                <Col md={6}>
               <FormGroup dir="rtl" >
                  <div text align="right"><small ></small></div>
                   
                      <InputGroupAddon addonType="prepend">
                      </InputGroupAddon>
                      <div text align="right">
                        <Input placeholder='שם המזמין' values= {values.name} onChange={handleChange('name')}/>
                      </div>   
                   
                  </FormGroup>
                  </Col>
                  <Col md={6}>
                  <FormGroup dir="rtl" >
                  <div text align="right"><small ></small></div>
                   
                      <InputGroupAddon addonType="prepend">
                      </InputGroupAddon>
                      <div text align="right">
                        <Input placeholder='מספר פלאפון' values= {values.number} onChange={handleChange('number')}/>
                      </div>   
                   
                  </FormGroup>
                  </Col>
              </Row>
               <FormGroup>
                  
                  <Input
                    values= {tipuldate}
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
                        
                        <select className="custom-select" values= {values.cartype} onChange={handleChange('cartype')}>
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
                        
                        <select className="custom-select" values= {tipultype} onChange={handleChange('tipultype')}>
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
                        
                        <select className="custom-select" values= {egadtype} onChange={handleChange('egadtype')}>
                        <option value="">בחר מתקן אחזקה</option>
          
                <option value="נחשונים">נחשונים</option>
       

                        
                         
                        </select>
                      </div>   
                   
                  </FormGroup>


                  <FormGroup dir="rtl" >
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      
                    </InputGroupAddon>
                    <Input placeholder="מספר צ'" type="textarea" values= {carnum} onChange={handleChange('carnum')}/>
                  </InputGroup>
                </FormGroup>
        <div style={{textAlign:'right'}}>
        <button className="btn btn-primary" > צור מוצר</button>
        </div>
      
    </form>
              </CardHeader>
              
            </Card>
          </Col>
)
const goBack = () =>(
    <div className="mt-5">
        <Link to ="/" className="text-danger">חזור אחורה</Link>
    </div>
  )
  const showSuccess = () =>(
   
         <div className="alert alert-info" style={{textAlign:'right',display: createdTipul ? '' : 'none' }}>
            <h2>הטיפול נשלח בהצלחה</h2>
            <h3>{`${createdTipul}`} מספר הזמנה</h3>
            <Link to='mytipuls'>לטיפולים</Link>
            
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
    return (
      <>
      <UserLayout/>
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
