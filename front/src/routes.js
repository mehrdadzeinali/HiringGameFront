import Home from './pages/Home/Home';
import LoginPage from './pages/Authentification/Login/Login';
import SignUpPage from './pages/Authentification/SignUp/SignUp';
import SearchPage from './pages/Employee/Search/Search';
import CreateProfile from './pages/Employee/Create/CreateProfile';
import ViewEmployeeProfile from './pages/Employee/ViewProfile/ViewProfile';
import ViewEmployeesList from './pages/Employee/ViewList/ViewList';
import VerifyEmail from './pages/Authentification/VerifyEmail/VerifyEmail';

const routes = [
  // Authentication routes
  { path: '/auth/signup', component: SignUpPage },
  { path: '/auth/login', component: LoginPage },
  { path: '/auth/verify-email', component: VerifyEmail},

  // main routes
  { path: '/home', component: Home },
  { path: '/', exact: true, component: Home },
  
  // employee routes
  { path: '/employee/create', component: CreateProfile },
  { path: '/employee/view/:employeeId', component: ViewEmployeeProfile },
  { path: '/employee/search', component: SearchPage },
  { path: '/employee/list', component: ViewEmployeesList}
];

export default routes;
