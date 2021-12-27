import Pickgoal from './views/authpages/pickgoal';
import Tipul from './views/authpages/Tipul';
import Tipultable from './views/Tipultable';
import Home from './views/authpages/Home';
import Login from './views/authpages/Signin';
import Signup from './views/authpages/Signup';

var routesauth = [


  {
    path: "/tipul", 
    component: Tipul,
    layout: "/auth"
  },
  {
    path: "/home", 
    component: Home,
    layout: "/auth"
  },
  {
    path: "/signin", 
    component: Login,
    layout: "/auth"
  },
  {
    path: "/signup", 
    component: Signup,
    layout: "/auth"
  },
  {
    path: "/dashboard",
    name: "בצע הזמנה",
    icon: "ni ni-circle-08 text-pink",
    component: Pickgoal,
    layout: "/auth"
  },
  //######### type of orders ######//
  {
    path: "/tipul",
    name: "בצע הזמנה",
    icon: "ni ni-circle-08 text-pink",
    component: Tipul,
    layout: "/auth"
  },
  {
    path: "/alltipul",
    name: "כל הטיפולים",
    icon: "ni ni-circle-08 text-pink",
    component: Tipultable,
    layout: "/admin"
  }
  /* {
    path: "/test",
    name: "בצע הזמנה",
    icon: "ni ni-circle-08 text-pink",
    component: Test,
    layout: "/auth"
  },
  {
    path: "/grira",
    name: "בצע הזמנה",
    icon: "ni ni-circle-08 text-pink",
    component: Grira,
    layout: "/auth"
  },
  {
    path: "/takala",
    name: "בצע הזמנה",
    icon: "ni ni-circle-08 text-pink",
    component: Takala,
    layout: "/auth"
  } */
]
export default routesauth;