import Home from './pages/Home/Home';
import LoginPage from './pages/Login/Login';
import SignUpPage from './pages/SignUp/SignUp';
import SearchPage from './pages/Search/Search';
import CreateProfile from './pages/CreateProfile/CreateProfile';
import ViewEmployeeProfile from './pages/ViewProfile/ViewProfile';

const routes = [
  // Authentication routes
  { path: '/signup', component: SignUpPage },
  { path: '/login', component: LoginPage },

  // main routes
  { path: '/home', component: Home },
  { path: '/searchPage', component: SearchPage },
  { path: '/', exact: true, component: Home },
  
  // employee routes
  { path: '/createProfile', component: CreateProfile },
  { path: '/viewProfile/:employeeId', component: ViewEmployeeProfile }
];

export default routes;
