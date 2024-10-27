import './App.css';
import {BrowserRouter as Router,useRoutes,} from "react-router-dom";
import { SignUpForm,SignIn } from './Components/SignUp/SignUpForm';
import CreateInterview from './Components/Home/CreateInterview';

const App = () => {
  let routes = useRoutes([
    { path: '/', element: <SignUpForm /> },
    { path:'/sign-in', element:<SignIn/>},
    { path:'/home', element:<CreateInterview/>},
    
  ]);
  return routes;
};
const AppWrapper=()=>{
  return(
      <Router>
        
        <App/>
      </Router>
  )
}
export default AppWrapper;
