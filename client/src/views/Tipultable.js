import React, { Component } from 'react'
import axios from 'axios';
import ReactToExcel from 'react-html-table-to-excel';
import {
    Badge,
    Card,
    Button,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip
  } from "reactstrap";
  // core components
  import Header from "components/Headers/Header.js";
const Tipul =props => (
    <tr>
        <td>{props.tipul.tipuldate.substring(0,10)}</td>
        <td>{props.tipul.cartype}</td>
        <td>{props.tipul.tipultype}</td>
        <td>{props.tipul.egadtype}</td>
        <td>{props.tipul.carnum}</td>
    
        <td>{props.tipul.status}</td>
    <td>
    <Button color="danger"onClick={() => { props.deletetipul(props.tipul._id) }}> מחק </Button>
    <Button color="danger"onClick={() => { props.updatetipul(props.tipul._id) }}> עדכן </Button>
    </td>
    </tr>
 
  
)

export default class Tipultable extends Component {
    constructor(props) {
        super(props);
    
       
    
        this.state = {tipuls: []};
      }
      componentDidMount() {
          axios.get('/api/tipuls')
            .then(response => {
              this.setState({ tipuls: response.data })
            })
            .catch((error) => {
              console.log(error);
            })
        }
       

        
        tipulList() {
            return this.state.tipuls.map(tipul => {
              return <Tipul tipul={tipul}  key={tipul._id} updatetipul={this.updatetipul}/>;
            })
          }
    render() {
        return (
            <div>
                   <Header />
        {/* Page content */}
        <Container className="mt--7" fluid >
          {/* Table */}
          <Row>
            <div className="col" style={{textAlign:"right"}} >
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">כל הטיפולים</h3>
                 
                  <div style={{textAlign:"left"}}>
                  <ReactToExcel
                  className="btn btn-sm btn-success"
                   table="tableAlltipul"
                   filename="excelFile"
                   sheet="sheet 1"
                   buttonText="ייצא לאקסל"/>
                   </div>
                </CardHeader>
                <Table className="align-items-center table-flush" id="tableAlltipul" responsive>
                  <thead className="thead-light">
                   
                    <tr>
                      <th scope="col">תאריך טיפול</th>
                      <th scope="col">סוג רכב </th>
                      <th scope="col">סוג טיפול</th>
                      <th scope="col">מתקן אחזקה</th>
                      <th scope="col">מספר צ</th>
                      
                      <th scope="col">סטטוס</th>
                     
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                   {this.tipulList()}
                  </tbody>
                </Table>
                {/* <CardFooter className="py-4">
            
                </CardFooter> */}
              </Card>
            </div>
          </Row>  
          {/* Dark table */}
          
        </Container>
            </div>
        )
    }
}
