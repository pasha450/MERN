import React from "react";
import { Link } from "react-router-dom";


function Signin(){
  return(
      <section className="login-bg h-100">
      <div className ="mt-4">
      <div className="container h-100">
        <div className="row justify-content-center align-items-center h-100">
          <form className="col-md-12 col-sm-12">
            <div className="AppForm shadow-lg">
              <div className="AppFormLeft">
                <div className="brand-logo">
                  <Link to="coach-login.html">
                    <img src="images/brand-logo.png" alt=""/>
                  </Link>
                </div>
                <h1>Login</h1>
                <p>Hello Welcome to the <span> lifteachother! </span>
                </p>
                <div className="form-group position-relative mb-4">
                  <i className="fa fa-user"></i>
                  <input type="text" className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" id="username" placeholder="Email or Phone No."/>
                </div>
                <div className="form-group position-relative mb-4">
                  <i className="fa fa-key"></i>
                  <input type="password" className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" id="password" placeholder="Password"/>
                </div>
                <div className="row mt-4 mb-4">
                  <div className="col-md-12 col-sm-12">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                        <label className="form-check-label" htmlFor="defaultCheck1"> Remember me </label>
                      </div>
                      <Link to ="/forget">Forgot Password?</Link>
                    </div>
                  </div>
                </div>
                <Link to ="coach-client.html" className="login-btn"> Login </Link>
                <p className="text-center mt-4 mb-0"> Don't have an account? <Link to ="/register">Create your account</Link>
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
export default Signin;