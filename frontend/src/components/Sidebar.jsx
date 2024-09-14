import React from "react";
import { Link } from "react-router-dom";
// import { ToastContainer,toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { ToastContainer } from "react-toastify";
function Sidebar(){
   
    const navigate = useNavigate();
    const handleLogout =async () => {
       
        // toast .info('Logged out successfully!');

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out of your account.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out!',
            cancelButtonText: 'Cancel'
         });
         if (result.isConfirmed) {
            Cookies.remove('authToken');
            localStorage.removeItem('savedEmail'); 
            localStorage.removeItem('savedPassword'); 
            Swal.fire(
                'Logged out!',
                'You have been logged out successfully.',
                'success'
              );
              navigate('/login');
         }
    };
    return(
        <>

            <div className="side-nav">
              <div className="left-panel h-100">
                <Link className="logo-top mb-3" to ="coach-login.html">
                  <img src="/assests/images/brand-logo-icon.png" alt="logo"/>
                  <span className="brand-logo-text"><img src="/assests/images/brand-logo-text.png" alt="logo"/></span>
                </Link>
                <ul className="nav navbar-nav nav-pills mb-3">
                  <li className="nav-item" title="Client">
                    <Link className="nav-link icon-top active" id="pills-home-tab" to=""><img src="/assests/images/client.svg" alt="icon"/>Client</Link>
                  </li>
                  <li className="nav-item" title="Session Planner">
                    <Link  className="nav-link icon-top" id="pills-profile-tab" to="/profile"><img src="/assests/images/calendar.svg" alt="icon"/>Profile</Link>
                  </li>
    
                  <li className="nav-item" title="Exercise Library">
                    <Link className="nav-link icon-top" id="pills-contact-tab" href="coach-exercise-library.html"><img src="/assests/images/exercise-library.svg"
                        alt="icon"/>Exercise
                      Library</Link>
                  </li>
                  <li className="nav-item" title="Custom Presets">
                    <Link className="nav-link icon-top" id="pills-custom-tab" href="coach-custom-presets.html"><img src="/assests/images/custom.svg" alt="icon"/>Custom
                      Presets</Link>
                  </li>
                  <li className="nav-item" title="Logout">
                    <Link className="nav-link icon-top" to="# " onClick={handleLogout}><img src="/assests/images/logout.svg" alt="icon"/>Logout</Link>
                  </li>
                </ul>
              </div>
            </div>
            <ToastContainer/>
        </>
    )
}
    export default Sidebar; 