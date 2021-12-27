import React, { useEffect, useState } from 'react'
import {
    Badge,
    Card,
    Button,
} from "reactstrap";
// core components

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import AdminNavbar from '../components/Navbars/AdminNavbar'
import { Link } from 'react-router-dom';


const AdminSchedule = () => {
    const [date, SetDate] = useState(new Date());
    const [dateday, SetDateDay] = useState(new Date().getDate());
    const [datemonth, SetDateMonth] = useState(new Date().getMonth() + 1);
    const [dateyear, SetDateYear] = useState(new Date().getFullYear());

    function changedatevars(date) {
        SetDate(date);
        SetDateDay(date.getDate());
        SetDateMonth(date.getMonth() + 1);
        SetDateYear(date.getFullYear());
    }

    return (
        <div>
            <AdminNavbar />
            <div className="header bg-gradient-orange py-5 ">
            </div>
            <div className="header bg-gradient-orange py-5 " style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Calendar className="my--5 "
                    calendarType="Hebrew"
                    onClickDay={changedatevars}
                    value={date} />
            </div>

            <div className="header bg-gradient-orange py-5 " style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <Link to={`tipul/specificdateschedule/${dateday}/${datemonth}/${dateyear}`}> <Button>הצג לוז לתאריך:{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</Button></Link>
            </div>
       {/*<p>{dateday}/{datemonth}/{dateyear}</p>*/}
        </div>
    )
}
export default AdminSchedule; 