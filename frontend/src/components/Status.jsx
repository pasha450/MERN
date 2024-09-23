import React from "react"
import { Link } from "react-router-dom";
import { useState ,useEffect} from "react";
import StatusModal from "./StatusModal";
import axios from "axios";
import Cookies from "js-cookie";


const apiUrl = process.env.REACT_APP_API_URL;

function  Status(){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [header, setHeader] = useState({});
  const [userId, setUserId] = useState('');
  const [users, setUsers] = useState([]);
  const [formData,setFormData] = useState(userData)
  // const[userToEdit,setUserToEdit] =useState([]);

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
        const response = await axios.post(`${apiUrl}/priority`, { userId: userId }, { headers: header });
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
      
      const response = await axios.post(`${apiUrl}/priority/edit`, { userId: userId }, { headers });
      const userData = response.data.userData;
      console.log(userData)
      
      setFormData({
        userId: userData._id,
        Name: userData.Name,
        StatusChecked: userData.StatusChecked,
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
     
      const response = await axios.post(`${apiUrl}/priority/update`, updatedData, { headers });
      const updatedUser = response.data.updatedUser;
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };
  
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure want to delete this user?");
    if (!confirmDelete) return; 
  
    try {
      const token = Cookies.get('authToken');
      const headers = {
        'Authorization': token
      };
      await axios.post(`${apiUrl}/priority/deleted`, { userId: userId }, { headers });
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.log('Error in user fetching data', error);
    }
  };
    return(
        <>
            <div className="main-content-section">
              <div className="right-panel">
                <div className="row">
                  <div className="col-sm-12 text-center">
                    <div className="title-bg title2 d-flex align-items-center justify-content-between">
                      <img src="/assests/images/custom.svg" alt="icon" />
                      <button
                      type="button"
                      className="right-btn position-static-right"
                      onClick={openModal}>  <i className="fa fa-plus" ></i>Add Clients </button>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="form-block">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Status Checked</th> 
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                         {users.map((user, index) => ( 
                        <tr key={index}>
                          <td>{user.Name}</td>
                          <td>{user.StatusChecked}</td>
                          <td>
                            <div className="td-icons">
                              <Link to="">
                                <i className="fa fa-edit" onClick={() => handleClick(user._id)}></i>
                              </Link>
                              <Link to="">
                                <i className="fa fa-trash"onClick={() => handleDelete(user._id)}></i>
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
            <StatusModal 
            isOpen={isModalOpen} 
            onClose={closeModal} 
            // userToEdit={userToEdit} 
            onUpdate={handleUpdate}
            setFormData={setFormData}
            formData={formData} 
            addUser={addUser}
            />
        </>
    )
}
export default Status;