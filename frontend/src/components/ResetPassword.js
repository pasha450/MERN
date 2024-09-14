import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useParams,Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const { token } = useParams();
    console.log(token, 'token');

    // used for password visibility ******----
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const validateForm = () => {
        const newErrors = {};
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
        } else if (!passwordRegex.test(password)) {
            newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
      };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm() && validateForm() !==undefined) {
            return; 
        }

        try {
            const response = await axios.post(`${apiUrl}/resetPassword`, { token, password ,confirmPassword});
            console.log('Reset successful:', response);
            setSuccessMessage("Password has been reset successfully!");
            toast.success('Password reset successful!');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.error('Reset failed:', error);
            setErrorMessage("Please try again later.");
            toast.error('Reset failed. Please try again later.');
        }
    };
    return(
    
    <section className="login-bg h-100">
      <div className="mt-4">
          <div className="container h-100">
              <div className="row justify-content-center align-items-center h-100">
                  <form className="col-md-12 col-sm-12" onSubmit={handleSubmit}>
                      <div className="AppForm shadow-lg">
                          <div className="AppFormLeft">
                              <div className="brand-logo">
                                  <Link to="#">
                                  <img src="/assests/images/brand-logo.png" alt="" />
                                  </Link>
                              </div>
                              <div className="AppFormLeft">
                                  <h1>Reset Password</h1>
                                  <p>We’ll send you reset password instruction on your Email please check you email.</p>
                                  <div className="form-group position-relative mb-4">
                                      <input type={passwordVisible ? "text" : "password"} className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" id="password" placeholder=" Enter your Password" value={password} autoComplete="new-password" onChange={(e)=> setPassword(e.target.value)} required />
                                      <i>
                        <img src={passwordVisible ? "/assests/images/eye.svg" : "/assests/images/eye-off.svg"}
                            alt="AP88 SignIn"
                            className="img-fluid"
                            onClick={togglePasswordVisibility} />
                    </i> {errors.password &&
                                      <div className="text-danger">{errors.password}</div>}
                                  </div>
                                  <div className="form-group position-relative mb-4">
                                      <input type={confirmPasswordVisible ? "text" : "password"} className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" id="password" placeholder="Confirm Your Password" autoComplete="new-password" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} />
                                      <i>
                        <img src={confirmPasswordVisible ? "/assests/images/eye.svg" : "/assests/images/eye-off.svg"}
                            alt="AP88 SignIn"
                            className="img-fluid"
                            onClick={toggleConfirmPasswordVisibility} />
                    </i> {errors.confirmPassword &&
                                      <div className="text-danger">{errors.confirmPassword}</div>}
                                  </div>
                                  <div className="col-md-12 text-center">
                                      <button className="login-btn text-white border-0" type="submit">Reset Password
                                      </button>
                                      {successMessage && (
                                      <div className="text-success mt-3">{successMessage}</div>)} {errorMessage && (
                                      <div className="text-danger mt-3">{errorMessage}</div>)}
                                  </div>
                              </div>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
      </div>
      <ToastContainer/>
    </section>
    )
  }

  export default ResetPassword;