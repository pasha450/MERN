// import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Forget from './pages/Forget'
import PasswordSet from './pages/PasswordSet';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Project from './pages/Project';
import Developer from './pages/Developer';
import Priority from './pages/Priority';
import ViewPage from './pages/ViewPage';


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
       <Route path ="/project" element={<Project/>}></Route>
       <Route path ="/developer" element ={<Developer/>}></Route>
       <Route path ="/priority" element ={<Priority/>}></Route>
       <Route path ="/view/:userId" element ={<ViewPage/>}></Route>
       

    </Routes>
  </BrowserRouter>
      
   );
}  

