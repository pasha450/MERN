import React, { useState ,useEffect} from "react";
import { Link,useNavigate} from "react-router-dom";
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie'; 
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


function Signup() {
  const {register, handleSubmit, setValue,formState: { errors },} = useForm();
  const [isPaswordVisiable , setIsPasswordVisiable] = useState(false);
  const [ConfirmPaswordVisiable , setConfirmPasswordVisiable] = useState(false);
  const [error ,setError]=useState()
  const navigate =useNavigate();
  const [isChecked, setIsChecked] = useState(false); 
  const[formValues,setFormValues] =useState({
              username:"", 
              email:"",
              phone:"",
              password:"",
              confirmPassword:"",
        });  
     
        const apiUrl = process.env.REACT_APP_API_URL;
        // console.log(apiUrl,'apiUrl');
   useEffect(()=>{
          const token = Cookies.get('authToken');
          if (token) {
            navigate('/'); 
          }   
		  const savedEmail =localStorage.getItem('savedEmail')
		  const savedPassword = localStorage.getItem('savedPassword')
		  const savedName =localStorage.getItem('savedName')
		  const savedphone = localStorage.getItem('savedphone')
		  if (savedEmail && savedPassword &&savedName && savedphone) {
				setValue('email', savedEmail);
				setValue('password', savedPassword);
				setValue('name', savedName);
				setValue('phone', savedphone);
				
			} 
			  },   [navigate,setValue]);
      
        const handleCheckboxChange = (event) => {
          setIsChecked(event.target.checked); 
          if (!isChecked) {
            setError('You must accept the terms of use and Privacy Policy');
          } else {
            setError('');
          } 
        };
        const handleInputChange = (field, value) => {
          setFormValues({ ...formValues, [field]: value });
          setValue(field, value, { shouldValidate: true });
          };  

       const onSubmit = async (data) =>{
        try{
          const response = await axios.post(`${apiUrl}/register`, formValues);
          console.log('Signup successful:', response);
          toast.success('Registration successful!');
          setTimeout(() => {
          navigate('/login');
          }, 800);  
        }catch (error) {
          console.error('Signup error:', error);

          if (error.response && error.response.data.errors) {
            error.response.data.errors.forEach(err => {
              setError(err.path, { type: 'server', message: err.msg });
            });
          } 
           else if (error.response && error.response.data.error) {
          toast.error(error.response.data.error);    
          }
           else {
          toast.error('An unexpected error occurred. Please try again.');
          } 
         }
        };
        // console.log(error,'error')
    return(
        <section className="login-bg h-100">
       <div className ="mt-4">
      <div className="container h-100">
        <div className="row justify-content-center align-items-center h-100">
          <form className="col-md-12 col-sm-12" onSubmit={handleSubmit(onSubmit)}>
            <div className="AppForm shadow-lg">
              <div className="AppFormLeft">
                <div className="brand-logo">
                  <Link to ="/">
                    <img src="images/brand-logo.png" alt=""/>
                  </Link>
                 
                </div>
                <h1>Register</h1>
                <p>Hello Welcome to the <span> lifteachother! </span>
                </p>
                <div className="form-group position-relative">
                  <input 
                   type="Name"
                   className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" 
                   id="username"
                   placeholder="Name"
                    value={formValues.name}
                    {...register("name", {
                      required: 'Name is required',
                      validate: {
                      maxLength: v =>
                        v.length <= 15 || "The  Name should have at most 15 characters",
                      matchPattern: v =>
                        /^[A-Za-z\s]+$/.test(v) || "Name must be a valid address"
                      }
                    })}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  <i className="fa fa-user"></i>
                  {errors.name && <p className="text-danger">{errors.name.message}</p>}
                </div>
                <div className="form-group position-relative">
                  <input
                   type="Email"
                   className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" 
                   id="email"
                  placeholder="Email"
                  value={formValues.email}
                  {...register("email", {
                  required: "Email address is required",
                  validate: {
                    maxLength: v =>
                    v.length <= 50 || "The Email address should have at most 50 characters",
                    matchPattern: v =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "Email address must be a valid address"
                  }
                  })}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                  {errors.email && <p className="text-danger">{errors.email.message}</p>}
                  <i className="fa fa-envelope"></i>
                </div>
               <div className="form-group position-relative">
                  <input
                   type="tel" 
                   className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" 
                   id="phone" 
                   placeholder="Phone No."
                   value={formValues.phone}
                   {...register("phone",{
                     required :"phone number is required"
                   })}
                   onChange={(e) => handleInputChange('phone', e.target.value)}
                   />
                  <i className="fa fa-phone"></i>
                  {errors.phone &&<p className="text-danger">{errors.phone.message}</p>}
                </div>
                <div className="form-group position-relative mb-4">
                  <input
                   type={isPaswordVisiable ? "text " :"password" } 
                   className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                    id="password"
                    placeholder="Password"
                    value={formValues.password}
                    {...register('password', {
                      required: 'Password must be required',
                      minLength: { value: 8, message: 'Password must be at least 8 characters long' },
                    })}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    />
                    <img src={isPaswordVisiable ? "/assests/images/eye.svg" : "/assests/images/eye-off.svg"} alt="AP88 SignIn" className="img-fluid eye-icon" onClick={()=>setIsPasswordVisiable(!isPaswordVisiable)}/>
                  {errors.password && <p className="text-danger">{errors.password.message}</p>}
                </div>
                <div className="form-group position-relative mb-4">
                  <input 
                  type={ConfirmPaswordVisiable ? "text" :"password"}
                   className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" 
                   id="password"
                   placeholder="Confirm Password"
                   value={formValues.confirmPassword}
                   {...register('confirmPassword', {
                    required: 'ConfirmPassword is required',
                    validate: value => value === formValues.password || 'Password do not match'
                    })}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                   />
                   <img src={ConfirmPaswordVisiable ? "/assests/images/eye.svg" : "/assests/images/eye-off.svg"} alt="" className="eye-icon img-fluid" onClick={()=>setConfirmPasswordVisiable(!ConfirmPaswordVisiable)}/>
                  {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
                </div>
                <div className="row  mt-4 mb-4">
                  <div className="col-md-12">
                    <div className="form-check">
                      <input 
                      className="form-check-input" 
                      type="checkbox"  value="" 
                      id="defaultCheck1"
                      name="checkbox"
                      {...register('checkbox', {
                       required: "Checkbox is required",
                      })}
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label" 
                      htmlFor ="defaultCheck1">I accept <Link to="#"> the terms of use </Link> &amp; <Link to="#">Privacy Policy</Link>
                      </label>
                      {errors.checkbox && <p className="text-danger">{errors.checkbox.message}</p>}
                    </div>
                  </div>
                </div>
                <div className="col-md-12 text-center">
                  <button className="login-btn text-white border-0">Register</button>
                </div>
                <p className="text-center mt-4 mb-0"> Already have an account? <Link to ="/login">Sign in</Link>
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
export default Signup;
