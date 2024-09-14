import React ,{useState}from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer ,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Forget(){
  const apiUrl = process.env.REACT_APP_API_URL;
  const[email,setEmail]=useState('');
  const[error,setError]=useState('');
  const[message,setMessage]=useState('');
  const[loading,setloading]=useState('');

  const validateEmail = (email) =>{
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     return re.test(String(email).toLowerCase());
  }
 
   const handleSubmit = async (event) => {
   event.preventDefault();
      setError('');
      setMessage('');
   
 if(!validateEmail(email))
 {   
   setError('Please Enter a valid email address');
   return;
 }
 setloading(true);
       try {
          const response = await axios.post(`${apiUrl}/forgetPassword`, { email });
          setMessage(response.data.message);
          console.log(setMessage);
          toast.success('Reset email sent successfully');

     setTimeout(() => {
           }, 800);
   } catch (err) {
     toast.error('error sending reset email');
     }finally{
     setloading(false);
     }
   }; 
  
    return(
    
        <section className="login-bg h-100">
        <div className ="mt-4">
        <div className="container h-100">
          <div className="row justify-content-center align-items-center h-100">
            <form className="col-md-12 col-sm-12" onSubmit={handleSubmit}>
              <div className="AppForm shadow-lg">
                <div className="AppFormLeft">
                  <div className="brand-logo">
                    <Link to ="client-login.html">
                      <img src="/assests/images/brand-logo.png" alt=""/>
                    </Link>
                  </div>
                  <div className="AppFormLeft">
                    <h1>Forget Password</h1>
                    <p>We’ll send you reset password instruction on your Email please check you email.</p>
                    <div className="form-group position-relative mb-4">
                      <input type="email" 
                      className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" 
                      id="Email"
                     placeholder="Email"
											 value={email}
                       onChange={(e) => setEmail(e.target.value)}
											disabled={loading}
                      />
		                  <i className="fa fa-envelope-o"></i>
											{error && <div className="text-danger">{error}</div>}

                    </div>
                    <div className ="col-md-12 text-center"> 
                            <button 
                            className ="login-btn text-white border-0"
                            type="submit"
										        disabled={loading}
                            >Forget Password</button>
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
export default Forget;