import React from "react";
import { Link} from "react-router-dom";

function Signup() {
 
    return(
        <section className="login-bg h-100">
       <div className ="mt-4">
      <div className="container h-100">
        <div className="row justify-content-center align-items-center h-100">
          <form className="col-md-12 col-sm-12">
            <div className="AppForm shadow-lg">
              <div className="AppFormLeft">
                <div className="brand-logo">
                  <Link to ="client-login.html">
                    <img src="images/brand-logo.png" alt=""/>
                  </Link>
                </div>
                <h1>Register</h1>
                <p>Hello Welcome to the <span> lifteachother! </span>
                </p>
                <div className="form-group position-relative">
                  <input type="Name" className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" id="username" placeholder="Full Name"/>
                  <i className="fa fa-user"></i>
                </div>
                <div className="form-group position-relative">
                  <input type="Email" className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" id="email" placeholder="Email"/>
                  <i className="fa fa-envelope"></i>
                </div>
               <div className="form-group position-relative">
                  <input type="tel" className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" id="phone" placeholder="Phone No."/>
                  <i className="fa fa-phone"></i>
                </div>
                <div className="form-group position-relative mb-4">
                  <input type="password" className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" id="password" placeholder="Password"/>
                  <i className="fa fa-key"></i>
                </div>
                <div className="form-group position-relative mb-4">
                  <input type="password" className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" id="password" placeholder="Confirm Password"/>
                  <i className="fa fa-key"></i>
                </div>
                <div className="row  mt-4 mb-4">
                  <div className="col-md-12">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                      <label className="form-check-label" 
                      htmlFor ="defaultCheck1">I accept <Link to="#"> the terms of use </Link> &amp; <Link to="#">Privacy Policy</Link>
                      </label>
                    </div>
                  </div>
                </div>
                <Link to ="client-login.html" className="login-btn"> Register </Link>
                <p className="text-center mt-4 mb-0"> Already have an account? <Link to ="/login">Sign in</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
        </section>
    
    )
}
export default Signup;