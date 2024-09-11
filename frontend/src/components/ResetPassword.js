import React from "react";
import { Link } from "react-router-dom";

function ResetPassword(){
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
                  <div className="AppFormLeft">
                    <h1>Reset Password</h1>
                    <p>We’ll send you reset password instruction on your Email please check you email.</p>
                    <div className="form-group position-relative mb-4">
                  <input type="password" className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" id="password" placeholder="Password"/>
                  <i className="fa fa-key"></i>
                </div>
                <div className="form-group position-relative mb-4">
                  <input type="password" className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" id="password" placeholder="Confirm Password"/>
                  <i className="fa fa-key"></i>
                </div>
                    <Link to ="client-login.html" className="login-btn"> Reset Password </Link>
                  </div>
                </div>
                </div>
            </form>
          </div>
        </div>
        </div>
      </section>
    )
}
export default ResetPassword;