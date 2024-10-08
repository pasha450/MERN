import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DeveloperModal from "./DeveloperModal";
import axios from "axios";
import Cookies from "js-cookie"; 

const apiUrl = process.env.REACT_APP_API_URL;
const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

function Development() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [header, setHeader] = useState({});
  const [userId, setUserId] = useState('');
  const [users, setUsers] = useState([]);
  const [formData,setFormData] = useState(userData)
  // const [userToEdit,setUserToEdit] =useState([]);  
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  useEffect(() => {
    const token = Cookies.get('authToken');
    let loggedUserData = localStorage.getItem('storeData');
    loggedUserData = JSON.parse(loggedUserData);  
    const userId = loggedUserData.userId;
    const header = {
      'Authorization': token 
    };  
    setHeader(header);
    setUserId(userId);
    
    const fetchUsers = async () => {
      try {
        const response = await axios.post(`${apiUrl}/developer`, { userId: userId }, { headers: header ,
        });
        setUsers(response.data.userData);
      } catch (error) {
        console.error('Error fetching userData:', error);
      }
    };
    fetchUsers();
  }, []);  

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const handleClick = async (userId) => { 
    try {
      const token = Cookies.get('authToken');
      const headers = {
        'Authorization': token
      };
      const response = await axios.post(`${apiUrl}/developer/editprofile`, { userId: userId }, { headers });
      const userData = response.data.userData;
      console.log(userData)

      setFormData({
        userId: userData._id,
        profile_image: userData.profile_image,
        DeveloperName: userData.DeveloperName,
        Email: userData.Email,
        Role: userData.Role,
        Status: userData.Status,
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      const token = Cookies.get('authToken');
      const headers = {
        'Authorization': token
      };
      
      const response = await axios.post(`${apiUrl}/developer/update`, updatedData, { headers });
      const updatedUser = response.data.updatedUser;
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return; 
   
    try {
      const token = Cookies.get('authToken');
      const headers = {
        'Authorization': token
      };
      await axios.post(`${apiUrl}/developer/deleted`, { userId: userId }, { headers });
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.log('Error in user fetching data', error);
    }
  };
  return (
    <>
      <div className="main-content-section">
        <div className="right-panel">
          <div className="row">
            <div className="col-sm-12 text-center">
              <div className="title-bg title2 d-flex align-items-center justify-content-between">
                <img src="/assests/images/client.svg" alt="icon"/>
                <button
                  type="button"
                  className="right-btn position-static-right"
                  onClick={openModal}
                >
                  <i className="fa fa-plus"></i>Add Clients
                </button>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="form-block">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>ProfileImage</th>
                        <th>Developer Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => ( 
                        <tr key={index}>
                         <td>
                              {user.profile_image ? (
                                <img 
                                  src={`${baseUrl}/ProfileImage/${user.profile_image}`} alt="Profile" 
                                  style={{ width: '50px', height: '50px', 
                                    borderRadius: '50%', 
                                    objectFit: 'cover' 
                                  }} 
                                />
                              ) : (
                                <img
                                src="/assests/images/download.png"
                                alt="No Profile"
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  borderRadius: '50%',
                                  objectFit: 'cover',
                                }}
                              />
                            )}
                            </td>
                          <td>{user.DeveloperName}</td>
                          <td>{user.Email}</td>
                          <td>{user.Role}</td>
                          <td>{user.Status == 1 ? 'Active' : 'Deactive'}</td>
                          <td>
                            <div className="td-icons">
                              <Link to="">
                                <i className="fa fa-edit" onClick={() => handleClick(user._id)}></i>
                              </Link>
                              <Link to="">
                                <i className="fa fa-trash" onClick={() => handleDelete(user._id)}></i>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))} 
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeveloperModal 
        addUser={addUser}
        isOpen={isModalOpen} 
        onClose={closeModal} 
        formData={formData} 
        setFormData={setFormData}
        onUpdate={handleUpdate}
        // userToEdit={userToEdit} 
      />
    </>
  );
}

export default Development;
