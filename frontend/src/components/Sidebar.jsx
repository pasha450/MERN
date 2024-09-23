import React from "react";
import { Link ,useLocation} from "react-router-dom";
// import { ToastContainer,toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { ToastContainer } from "react-toastify";
function Sidebar(){
    const location = useLocation();
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
                  <li className="nav-item" title="Profile">
                    <Link  className={`nav-link icon-top ${location.pathname === '/profile' ? 'active' : ''}`} id="pills-profile-tab" to="/profile"><img src="/assests/images/calendar.svg" alt="icon"/>Profile</Link>
                  </li>
    
                  <li className="nav-item" title="Projects">
                    <Link className={`nav-link icon-top ${location.pathname === '/project' ? 'active' : ''}`} id="pills-contact-tab" to ="/project"><img src="/assests/images/exercise-library.svg"
                        alt="icon"/>Projects</Link>
                  </li>
                  <li className="nav-item" title="Custom Presets">
                    <Link className={`nav-link icon-top ${location.pathname === '/developer' ? 'active' : ''}`} id="pills-custom-tab" to="/developer"><img src="/assests/images/client.svg" alt="icon"/>
                      Developers</Link>
                  </li>
                  <li className="nav-item" title="Client">
                    <Link className={`nav-link icon-top ${location.pathname === '/priority' ? 'active' : ''}`} id="pills-home-tab" to="/priority"><img src="/assests/images/custom.svg" alt="icon"/>Priority</Link>
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