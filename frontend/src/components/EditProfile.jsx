import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import  axios  from "axios";
import Cookies from "js-cookie";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const apiUrl = process.env.REACT_APP_API_URL;


function EditProfile(){
       const [passwordVisible, setPasswordVisible] = useState(false);
       const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
       const[userData,setUserData] =useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        })
       const[userId, setUserId] = useState('');
       const[header, setHeader] = useState({});
    
    //    used for password Visibility *****
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

       useEffect(()=>{
        const token = Cookies.get('authToken');
        let loggedUserData = localStorage.getItem("storeData");
        loggedUserData = JSON.parse(loggedUserData)
        const userId = loggedUserData.userId;
        const header = {
            'Authorization': token 
        }
        // **********---
        setUserId(userId);
        setHeader(header);
        const fetchUserData = async () => {
            try {
                const result = await axios.post(`${apiUrl}/editProfile`,{userId:userId},{ headers: header});
                const userObject = {
                    userId:result.data.userData._id,
                    name:result.data.userData.name,
                    email:result.data.userData.email,
                    phone:result.data.userData.phone,
                    // password:userData.password,
                    // confirmPassword:userData.confirmPassword
                }
                setUserData(userObject);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData();
       },[]);

    // update the form field*****------
    const handleChange = (e) => {
        const { name, value} = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        // console.log("name = " , e.target.name);    
        // console.log("current name", userData.name)
    };

    const handleSubmit = async (e) => {
     e.preventDefault();
     if (userData.password !== userData.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
    }

        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('userId', userId);
        formData.append('email', userData.email);
        formData.append('phone', userData.phone);
        formData.append('password', userData.password);
       
        try{
           
            console.log(userData,'userData')
            let result = await axios.post(`${apiUrl}/updateProfile`,formData,{ headers: header} );
            console.log("form submitted !!",result);
            toast.success('Profile updated successfully!'); 
            // navigate("/profile");
            const {name, phone, _id , password , email} = result.data.userData;
            const userObject = {
                userId: _id,
                name,
                email,
                phone,
                password,
            }
            localStorage.setItem('storeData',JSON.stringify(userObject));
        }
        catch(error){
          console.log(error);
          toast.error('Error updating profile');
        }  
    }
 
    return(
        <div className="main-content-section">
        <div className="right-panel">
          <div className="row">
            <div className="col-sm-12 text-center">
              <div className="title-bg title2 d-flex align-items-center justify-content-between">
                <img src="/assests/images/client.svg" alt="icon"/>
                <h1>Clients</h1>
                <Link className="right-btn position-static" to =""><i className="fa fa-plus"></i> Add
                  Clients</Link>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="form-block">
              <form className="col-md-12 col-sm-12" onSubmit={handleSubmit}>
                <div className="AppForm shadow-lg">
                <div className="AppFormLeft">
                    <div className="brand-logo">
                    <Link to="">
                        <img src="/assests/images/brand-logo.png" alt=""/>
                    </Link>
                    </div>
                    <h1>Edit Profile</h1>
                    <p>Hello Welcome to the <span> lifteachother! </span>
                    </p>
                    <div className="form-group position-relative">
                    <input type="text" 
                    className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" 
                    id="username" 
                    placeholder="Full Name"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    />
                    <i className="fa fa-user"></i>
                    </div>
                    <div className="form-group position-relative">
                    <input 
                    type="Email" 
                    className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" 
                    id="email"
                    placeholder="Email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    />
                    <i className="fa fa-envelope"></i>
                    </div>
                <div className="form-group position-relative">
                    <input 
                    type="tel" 
                    className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" 
                    id="phone"
                    placeholder="Phone No."
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    />
                    <i className="fa fa-phone"></i>
                    </div>
                    <div className="form-group position-relative mb-4">
                    <input type={passwordVisible ? "text" : "password"}
                     className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" 
                     id="password" 
                     placeholder="Password"
                     name="password"
                     value={userData.password}
                     onChange={handleChange}
                    />
                     <i>
                     <img src={passwordVisible ? "/assests/images/eye.svg" : "/assests/images/eye-off.svg"}
                            alt="AP88 SignIn"
                            className="img-fluid"
                            onClick={togglePasswordVisibility} />
                     </i>
                    </div>
                    <div className="form-group position-relative mb-4">
                    <input 
                        type={confirmPasswordVisible ? "text" : "password"}
                        className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                        id="confirmPassword" 
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={userData.confirmPassword}
                        onChange={handleChange}
                    />
                    <i>
                      <img src={confirmPasswordVisible ? "/assests/images/eye.svg" : "/assests/images/eye-off.svg"}
                            alt="AP88 SignIn"
                            className="img-fluid"
                            onClick={toggleConfirmPasswordVisibility} />
                    </i>
                    </div>
                    <div className="row  mt-4 mb-4">
                     <div className="update-bottom text-end">
                        <button type="button" className="default-btn2 text-white border-0 mr-2">Cancel</button>
                        <button type="submit" className="default-btn3 text-white border-0">update</button>
                     </div>
                   
                </div>
                </div>
                </div>
            </form>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer/>
      </div>
    )
}
export default EditProfile;