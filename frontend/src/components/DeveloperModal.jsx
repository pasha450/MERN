import React from 'react';
import { useState,useEffect} from 'react';
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;
const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;


function DeveloperModal({isOpen,onClose,userToEdit ,addUser,formData,setFormData}){
const navigate = useNavigate();
const[header,setHeader] = useState({})
const[userId,setUserId] =useState('')
const[selectedImage ,setSelectedImage] =useState();
 
const handleChange = (e) => {
    const { name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

useEffect(() => {
    const token = Cookies.get('authToken');
    let loggedUserData = localStorage.getItem('storeData');
    loggedUserData = JSON.parse(loggedUserData);
    const userId = loggedUserData.userId;
    const header = {
      Authorization: token,
    };
    setHeader(header);
    setUserId(userId);
  // }, [userToEdit]);
},[]);

//  for  image****----
const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setFormData((prevData) => ({
      ...prevData,
      profile_image: file,
    }));
  }
};
//   submit form ****
    const handleSubmit = async (e) => {
        e.preventDefault();
      
    // Create form data object ---------- append all fields 
    const formDataToSend = new FormData();
    formDataToSend.append('userId',formData.userId)
    formDataToSend.append('DeveloperName', formData.DeveloperName);
    formDataToSend.append('Email', formData.Email);
    formDataToSend.append('Status', formData.Status);
    formDataToSend.append('Role', formData.Role);
    formDataToSend.append('profile_image',formData.profile_image)
    if (selectedImage) {
      formDataToSend.append('profile_image', selectedImage);
    }
        try {
          let response;
    // -----update  exist developer-----
          if (userToEdit) {
            response = await axios.post(`${apiUrl}/developer/update`, formDataToSend, { 
              headers: {
                ...header,
              'Content-Type': 'multipart/form-data'
              },
            });
            // navigate(0);
    // **** add new developer ****----
          } else {
            response = await axios.post(`${apiUrl}/developer/store`, formDataToSend, { headers: header });
          }
          addUser(response.data);
          navigate(0);
          
          setFormData({
            DeveloperName:'',
            Email:'',
            Status: '',
            Role:'',
           profile_image:'',
          });
          setSelectedImage(null);
        } catch (error) {
          console.log('Error during submission:', error);
          onClose(true);
        }
  }   
    return(
        <>
      <Modal show={isOpen} onHide={onClose} animation={false}>
      <div className="puu-left">
        <button 
            type="button" 
            className="btn-close pull-right p-3"
            onClick={onClose}>
        </button>
      </div>
        
        <Modal.Body>
        <div className="want-to-edit">
            <div className="popup-heading-block text-center">
              <img src="/assests/images/red-flag-bg.svg" className="img-fluid w-25" alt=""/>
              <h3>Flag Data</h3>
              <p>Please report the incorrect information</p>
            </div>
        </div>
        <form className="formarea" onSubmit={handleSubmit}>

            <div className="form-group mb-4">
                <label>Developer Name</label>
                <input 
                    type="text"
                    className="form-control" 
                    name='DeveloperName'
                    placeholder="Enter Developer Name"
                    value={formData.DeveloperName}
                    onChange={handleChange}
                 />
            </div>
            <div className="form-group mb-4">
                 <label>Email</label>
                <input 
                    type="Email" 
                    className="form-control" 
                    name='Email'
                    placeholder="Write your Email here "
                    value={formData.Email}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group mb-4">
              <label>Status</label>
              <select
              className="form-control"
              name="Status"
              value={formData.Status}
              onChange={handleChange}
              >
              <option value="">Select Status</option> 
              <option value="1">Active</option>
              <option value="2">Deactive</option>
              </select> 
            </div>
 
            <div className="form-group mb-4">
                 <label>Role</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name='Role'
                    placeholder="Write here your job role"
                    value={formData.Role}
                    onChange={handleChange}
                />
            </div>  
            <div className="form-group mb-4">
              <label>Profile Image</label>
              <input
                type="file"
                className="form-control"
                name="profile_image"
                onChange={handleImageChange}
              />
            </div>
            <div className ="col-md-12 text-center"> 
                    <button 
                    className ="login-btn"
                    type="submit">Submit</button>
            </div>
         </form>

        </Modal.Body>
      </Modal>
    </>
    )
}   
   
export default DeveloperModal;