// import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Forget from './pages/Forget'
import PasswordSet from './pages/PasswordSet';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

export default function App() {
  return ( 
   
  <BrowserRouter>
    <Routes> 
    <Route path="/" element ={<Login/>}></Route>

       <Route path='/register' element={<Register/>}></Route>
       <Route path ='/login' element ={<Login/>}></Route>
       <Route path = '/forget'element ={<Forget/>}></Route>
       <Route path='/reset-password/:token' element ={<PasswordSet/>}></Route>
       <Route path ='/dashboard' element ={<Dashboard/>}></Route>
       <Route path="/profile" element={<Profile/>}/>
       
    </Routes>
  </BrowserRouter>
      
   );
}  

