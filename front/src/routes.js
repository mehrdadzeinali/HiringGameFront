import Home from './pages/Home/Home';
import LoginPage from './pages/Authentification/Login/Login';
import SignUpPage from './pages/Authentification/SignUp/SignUp';
import SearchPage from './pages/Employee/Search/Search';
import CreateProfile from './pages/Employee/Create/CreateProfile';
import ViewEmployeeProfile from './pages/Employee/ViewProfile/ViewProfile';

const routes = [
  // Authentication routes
  { path: '/signup', component: SignUpPage },
  { path: '/login', component: LoginPage },

  // main routes
  { path: '/home', component: Home },
  { path: '/', exact: true, component: Home },
  
  // employee routes
  { path: '/employee/create', component: CreateProfile },
  { path: '/employee/view/:employeeId', component: ViewEmployeeProfile },
  { path: '/employee/search', component: SearchPage },
];

export default routes;
