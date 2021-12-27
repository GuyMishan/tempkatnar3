import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Index from "./views/Index.js";
import Pickgoal from "./views/authpages/pickgoal";
import Tipul from "./views/authpages/Tipul";
import Tipultable from "views/Tipultable.js";
import Signin from './views/authpages/Signin';
import Signup from './views/authpages/Signup';
import UserRoute from './auth/UserRoute';
import AdminRoute from "auth/AdminRoute.js";
import SuperAdminRoute from "auth/SuperAdminRoute.js";

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Profile from "./views/authpages/Profile";
import MyTipuls from "./views/authpages/MyTipuls";
import ManageTipuls from './admin/ManageTipuls';
import TipulsHistory from './admin/TipulsHistory';
import AdminMonthlySchedule from './admin/AdminSchedule';
import AdminDailySchedule from './admin/AdminDailySchedule';
import AdminSpecificDateSchedule from './admin/AdminSpecificDateSchedule';
import UpdateTipul from "admin/UpdateTipul.js";



import SubDashboard from './subadmin/subdashboard';
import SubManageTipuls from './subadmin/subManageTipuls';
import SubtipulsHistory from './subadmin/subtipulsHistory';
import SubDailySchedule from './subadmin/subDailySchedule';
import SubMonthlySchedule from './subadmin/subMonthlySchedule';



const Routes = () => {
  return(
      <BrowserRouter>  
          <Switch>
              <Route path="/signin"  component ={Signin} />
              <Route path ="/signup" exact component ={Signup} />
              <UserRoute path ="/" exact component ={Pickgoal} />
              <UserRoute path ="/userprofile" exact component ={Profile} />
              <UserRoute path ="/tipul" exact component ={Tipul} />
              <UserRoute path ="/mytipuls" exact component ={MyTipuls} />
              <AdminRoute path ="/admin/dashboard" exact component ={Index} />
              <AdminRoute path ="/admin/managetipuls" exact component ={ManageTipuls} />
              <AdminRoute path ="/admin/tipul/update/:tipulId" exact component ={UpdateTipul} />
              <AdminRoute path ="/admin/tipulshistory" exact component ={TipulsHistory} />
              <AdminRoute path ="/admin/dailyschedule" exact component ={AdminDailySchedule} />
              <AdminRoute path ="/admin/monthlyschedule" exact component ={AdminMonthlySchedule} />
              <AdminRoute path ="/admin/tipul/specificdateschedule/:dateday/:datemonth/:dateyear" exact component ={AdminSpecificDateSchedule} />
              <Route path ="/subadmin/dashboard" exact component ={SubDashboard} />
              <Route path ="/subadmin/managetipuls" exact component ={SubManageTipuls} />
              <Route path ="/subadmin/tipulshistory" exact component ={SubtipulsHistory} />
              <Route path ="/subadmin/dailyschedule" exact component ={SubDailySchedule} />
              <Route path ="/subadmin/monthlyschedule" exact component ={SubMonthlySchedule} />
          </Switch>        
      </BrowserRouter>
  )
}

export default Routes;