import React, { useEffect, useState } from 'react'
import ReactToExcel from 'react-html-table-to-excel';
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
} from "reactstrap";
// core components
import { isAuthenticated } from 'auth/index';
import axios from 'axios';
import UserLayout from '../../layouts/Auth';

const Mytipuls = () => {
  const [tipuls, setTipuls] = useState([])
  const { user, token } = isAuthenticated()

  const loadTipuls = () => {
        const post = {
          userid:user._id
        };
    axios.get("/api/tipulsbyuser/"+user._id,post)
      .then(response => {
        setTipuls(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    loadTipuls()
  }, [])
  return (
    <div>
  <UserLayout/>  
      {/* Page content */}
      <Container className="mt--7" fluid >
        {/* Table */}
        <Row>
          <div className="col" style={{ textAlign: "right" }} >
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">כל הטיפולים</h3>
                <span>סה"כ כ-{tipuls.length}</span>
                <div style={{ textAlign: "left" }}>
                  <ReactToExcel
                    className="btn btn-sm btn-success"
                    table="tableAlltipul"
                    filename="excelFile"
                    sheet="sheet 1"
                    buttonText="ייצא לאקסל" />
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
                  {tipuls.map((p, i) => (
                    <tr>
                      <td>{p.tipuldate.substring(0, 10)}</td>
                      <td>{p.cartype}</td>
                      <td>{p.tipultype}</td>
                      <td>{p.egadtype}</td>
                      <td>{p.carnum}</td>
                      <td>{p.status}</td>
                    </tr>
                  ))}

                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  )
}
export default Mytipuls;