import React, {useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'; 


function Signin(){
  
  const navigate = useNavigate();
  const [isPaswordVisiable , setIsPasswordVisiable] = useState(false);
  const [user,setUser]=useState(null);
  
  const [rememberMe, setRememberMe] = useState(null);
  const [isCheckedrememberMe, setIsCheckedrememberMe] = useState(false);
  const { register,handleSubmit,setError,setValue,watch,formState: { errors },clearErrors} = useForm();

      useEffect(()=>{
        const token = Cookies.get('authToken');
       if (token) {
         navigate('/'); 
        }   
        // for rememberMe checked ---------
        const rememberMeData = localStorage.getItem('rememberMe');
        if (rememberMeData) {
            const parsedData = JSON.parse(rememberMeData);
            setRememberMe(parsedData)
            setIsCheckedrememberMe(true);
            setValue('email', parsedData.username);
            setValue('password', parsedData.password);
        }
    }, [navigate, setValue]);
     
    const email = watch("email");
    const password = watch("password");

      useEffect(() => {
        if (email) clearErrors('email');
        if (password) clearErrors('password');
        clearErrors('invalidCredential');
      }, [email, password, clearErrors]);
  
        
    const onSubmit = async (data) => {
      console.log("Form submitted with data:", isCheckedrememberMe);
      
        clearErrors();
      const apiUrl = process.env.REACT_APP_API_URL;
          try {
            const response = await axios.post(`${apiUrl}/login`,data);
            // console.log('Login successful:', response);
            toast.success('Login successfully!'); 
            const { token } = response.data;  
            const loggedUserData = response.data.user;
            console.log('response',loggedUserData);
            Cookies.set('authToken', token, { expires: 1 });
            const {_id, name, profile_image} = loggedUserData;
            const storeData = {userId:_id , name:name, profile_image:profile_image};
            localStorage.setItem('storeData', JSON.stringify(storeData));
            console.log('setUser',storeData);

          if (token) { 
              let rememberMe = {username:data.email,password:data.password};
              localStorage.setItem('rememberMe', JSON.stringify(rememberMe));
          }
          // without checkbox select login then user data not found*****----
          if(!isCheckedrememberMe) {
              localStorage.removeItem('rememberMe');
          } 
            setTimeout(() => {
                navigate('/profile')
             }, 800);
            } 
            catch (error) {
              if (error.response) {
                  if (error.response.data.errors) {
                      error.response.data.errors.forEach(err => {
                          setError(err.field, { type: 'server', message: err.message });
                      });
                  } else if (error.response.data.error) {
                      setError('invalidCredential', { type: 'server', message: error.response.data.error });
                  } else {
                      toast.error('Unknown error occurred');
                  }
              } else {
                  console.log('Error object:', error);
                  toast.error('Login failed. Please try again.');
              }
              console.log('Login failed:', error.message || 'Unknown error');
              localStorage.removeItem('storeData');
              setUser(null);
          }
          
      };  
        const handleRememberMeChange = (e) => {
          const isChecked = e.target.checked;
          setIsCheckedrememberMe(isChecked)
        };
  return(
      <section className="login-bg h-100">
      <div className ="mt-4">
      <div className="container h-100">
        <div className="row justify-content-center align-items-center h-100">
          <form className="col-md-12 col-sm-12" onSubmit={handleSubmit(onSubmit)}>
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
                  <input type="email"
                   className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" 
                   id="username"
                   name="email"
                   placeholder="Email"
                   {...register('email', {
                    required: 'This field is required',
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: 'Please enter a valid email address',
                    }                    
                     })}
                     defaultValue={rememberMe !== null ? rememberMe.username:''}
                     />
                  {errors.email && <p className="text-danger">{errors.email.message}</p>}
                </div>
                <div className="form-group position-relative mb-4">
                  <input type= {isPaswordVisiable ? "text " :"password" }
                  className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" 
                  id="password"
                  name="password"
                 placeholder="Password"
                 {...register('password', { 
                  required: 'Password is required',
                })}
                defaultValue={rememberMe !== null ? rememberMe.password:''}
                 />
                 <img src={isPaswordVisiable ? "/assests/images/eye.svg" : "/assests/images/eye-off.svg"} alt="Pailogs SignIn" className="img-fluid" onClick={()=>setIsPasswordVisiable(!isPaswordVisiable)}/>
                 {errors.password && <p className="text-danger">{errors.password.message}</p>}
                 {errors.invalidCredential && <p className="text-danger">{errors.invalidCredential.message}</p>}

                </div>
                <div className="row mt-4 mb-4">
                  <div className="col-md-12 col-sm-12">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="form-check">
                        <input 
                        className="form-check-input" 
                        type="checkbox"
                         value="" id="defaultCheck1"
                         onChange={handleRememberMeChange}
                         checked={isCheckedrememberMe}
                         />
                        <label className="form-check-label" htmlFor="defaultCheck1"> Remember me </label>
                      </div>
                      <Link to ="/forget">Forgot Password?</Link>
                    </div>
                  </div>
                </div>
                <div className ="col-md-12 text-center"> 
                            <button type="submit" className ="login-btn text-white border-0">Login</button>
                        </div>
                <p className="text-center mt-4 mb-0"> Don't have an account? <Link to ="/register">Create your account</Link>
                </p>
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
export default Signin;




