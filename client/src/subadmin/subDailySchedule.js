import React, { useEffect, useState } from 'react'

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
import SubAdminHeader from "components/Headers/subadminHeader.js";
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API } from '../config';


const SubDailySchedule = () => {
    const [tipuls, setTipuls] = useState([])
    const { user, token } = isAuthenticated()

    const loadTipuls = () => {
        var today = new Date();
        const date = {
            day: today.getDate(),
            month: today.getMonth() + 1,
            year: today.getFullYear(),
        }
        axios.post(`/api/tipuls/gettipulsbydatebyegadtype`,{user,date})
            .then(res => {
                setTipuls(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const SetTipulStatusDeleted = TipulId => {
        axios.post(`/api/tipul/settipulstatusdeleted/${TipulId}`, TipulId)
    }

    useEffect(() => {
        loadTipuls()
    }, [])
    return (
        <div>
            <SubAdminHeader />
            <Container className="mt--7" fluid >
                <Row>
                    <div className="col" style={{ textAlign: "right" }} >
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">כל הטיפולים לתאריך: {new Date().getDate()}/{new Date().getMonth() + 1}/{new Date().getFullYear()}</h3>
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
                                        <th scope="col">מספר פלאפון</th>
                                        <th scope="col">שם מזמין</th>
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
                                            <td>{p.number}</td>
                                            <td>{p.user}</td> {/* */}
                                            <td>{p.status}</td>
                                            <Link to={`/admin/tipul/update/${p._id}`}>
                                                <span className='badge badge-warning badge-pill'>
                                                    עדכן
                        </span>
                                            </Link>
                                            <Link>
                                                <span onClick={() => SetTipulStatusDeleted(p._id)} className='badge badge-danger badge-pill'>
                                                    מחק
                        </span>
                                            </Link>
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
export default SubDailySchedule;