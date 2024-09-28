import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

function AddUserModal({ isOpen, onClose, addUser, userData, setFormData ,formData,developerList,users}) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [header, setHeader] = useState({});
  const[selectedImage ,setSelectedImage] =useState();
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
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
     
  }, []);

  // for image change *****
  const handleImageChange = (e) => {
    const file = e.target.files;
    console.log(file,"file11")
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        attachments: file,
      }));
    }
  };

   console.log(formData,"formData")
  // form submission *****
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('userId', formData.userId);
    formDataToSend.append('ProjectName', formData.ProjectName);
    formDataToSend.append('Issue', formData.Issue);
    formDataToSend.append('StatusChecked', formData.StatusChecked);
    formDataToSend.append('Assignto', formData.Assignto);
    formDataToSend.append('attachments',formData.attachments);
    
    try {
      let response;
      if (formData.userId) {
        response = await axios.post(`${apiUrl}/task/update`, formDataToSend, {
          headers: {
            ...header,
          'Content-Type': 'multipart/form-data'
          },
        });
      } else {
        response = await axios.post(`${apiUrl}/task/store`, formDataToSend, { headers: header });
      }
      // addUser(response.data);
      // navigate(0);
         
      setFormData({
        userId:'',
        ProjectName: '',
        Issue: '',
        StatusChecked: '',
        Description: '',
        Assignto: '',
        attachments:[],
       
      });
    } catch (error) {
      console.log('Error during submission:', error);
      onClose(true);
    }
  };


  return (
    <>
      <Modal show={isOpen} onHide={onClose} animation={false}>
        <div className="puu-left">
          <button type="button" className="btn-close pull-right p-3" onClick={onClose}></button>
        </div>
      
        <Modal.Body>
          <div className="want-to-edit">
            <div className="popup-heading-block text-center">
              <img src="/assests/images/red-flag-bg.svg" className="img-fluid w-25" alt="" />
              <h3>Flag Data</h3>
              <p>Please report the incorrect information</p>
            </div>
          </div>
          <form className="formarea" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-group mb-4">
              <label>Project Name</label>
              <input
                type="text"
                className="form-control"
                name="ProjectName"
                placeholder="Enter your Project Name"
                value={formData.ProjectName}
                onChange={handleChange}
              />
            </div>
             <div className="form-group mb-4">
              <label>Issue</label>
              <input
                type="text"
                className="form-control"
                name="Issue"
                placeholder="Write your issue here"
                value={formData.Issue}
                onChange={handleChange}
              />
            </div> 

            <div className="form-group mb-4">
              <label>Description</label>
              <textarea
                className="form-control"
                name="Description"
                rows="3"
                cols="30"
                placeholder="Describe the project"
                value={formData.Description}
                onChange={handleChange}
              ></textarea>
            </div>
            
              <div className="form-group mb-4">
              <label>All Priority</label>
              <select
                className="form-control"
                name="StatusChecked"
                value={formData.StatusChecked}
                onChange={handleChange}
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.Name} 
                 </option>
                ))}
              </select>
            </div>
              <div className="form-group mb-4">
              <label>Assign to</label>
              <select
                className="form-control"
                name="Assignto"
                value={formData.Assignto}
                onChange={handleChange}
                required
              >
                <option value="">Select a user</option>
                {developerList.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.DeveloperName} 
                  </option>
                ))              
              }
              </select>
            </div> 

            <div className="form-group mb-4">
              <label>Profile Image</label>
              <input
                type="file"
                multiple
                className="form-control"
                name="attachments"
                onChange={handleImageChange}
              />
            </div>
            <div className="col-md-12 text-center">
              <button className="login-btn" type="submit">
                Submit 
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddUserModal;
