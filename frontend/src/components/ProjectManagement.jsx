import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddUserModal from "./AddUserModal";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

function ProjectManagement() {
  const navigate = useNavigate();
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState('');
  const [header, setHeader] = useState({});
  const [users, setUsers] = useState([]);
  const [activeDevelopers, setActiveDevelopers] = useState([]);
  const[activePriority,setActivePriority] = useState([]);
  
  // set form fields **
  const [formData, setFormData] = useState({
    userId: '',
    ProjectName: '',
    Issue: '',
    Status: '',
    Description: '',
    Assignto: '',
    attachments:[],
    
  });
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  useEffect(() => {
    const token = Cookies.get('authToken');
    let loggedUserData = localStorage.getItem('storeData');
    loggedUserData = JSON.parse(loggedUserData);  
    const userId = loggedUserData.userId;
    const header = {
      'Authorization': token 
  }  
    setHeader(header);
    setUserId(userId);
    
    const fetchUsers = async () => {
      try {
        const response = await axios.post(`${apiUrl}/task`, { userId: userId }, { headers: header });
        setUsers(response.data.userData);
      } catch (error) { 
        console.error('Error fetching userData:', error);
      }
    };
    fetchUsers();
  }, []);  
  
  //  fetch active developers ----
  useEffect(() => {
      const fetchActiveDevelopers = async () => {
        try {
          const response = await axios.get(`${apiUrl}/task/get-developer`, { headers: header });
          setActiveDevelopers(response.data.userData);
        } catch (error) {
          console.error('Error fetching active developers:', error);
        } 
      }; 
      fetchActiveDevelopers();   
  }, []);
   
  //  ## fetch priority page user name ---
  useEffect(() => {
    const fetchPriority = async () => {
      try {
        const response = await axios.get(`${apiUrl}/task/get-priority`, { headers: header });
        setActivePriority(response.data.userData);
      } catch (error) {
        console.error('Error fetching Priority Name List :', error);
      } 
    };
    fetchPriority();
    }, []);

  // Add new project to the list
    const addUser = (newUser) => {
      setUsers([...users, newUser]);
    };

//  for edit ----
    const handleClick = async (userId) => {
    try {
      const token = Cookies.get('authToken');
      const headers = {
        'Authorization': token
      }; 
      
      const response = await axios.post(`${apiUrl}/task/edit`, { userId: userId }, { headers });
      const userData = response.data.userData;
      
      setFormData({
        userId: userData._id, 
        ProjectName: userData.ProjectName,
        Issue: userData.Issue,
        Status: userData.Status,
        Assignto: userData.Assignto,
        attachments:userData.attachments,
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  // for  delete *****-----
    const handledelete =async(userId) =>{
      const confirmDelete = window.confirm("Are you sure want to delete this user?");
      if (!confirmDelete) return;

      try{
        const token =Cookies.get('authToken');
        const headers ={
          'Authorization': token
        }
        const response = await axios.post(`${apiUrl}/task/deleted`,{userId:userId},{headers:header})
        const userData =response.data.userData ;
        setUsers(users.filter(user =>user._id !==userId))
      }catch(error){
          console.log('error in user FetchingData ',error);
      }
    }

     
     
  return (
    <>
      <div className="main-content-section">
        <div className="right-panel">
          <div className="row">
            <div className="col-sm-12 text-center">
              <div className="title-bg title2 d-flex align-items-center justify-content-between">
                <img src="/assests/images/exercise-library.svg" alt="icon" />
                <h1 className="text-white">Project Management</h1>
                <button
                  type="button"
                  className="right-btn position-static-right"
                  onClick={openModal}
                >
                  <i className="fa fa-plus"></i> Add Clients
                </button>
                <Link className="" to=""></Link>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="form-block">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Project Name</th>
                        <th>Status</th>
                        <th>Assign to</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => ( 
                        <tr key={index}>
                          <td>{user.ProjectName}</td>
                          <td>{user.Status == 1 ? 'Active' : 'Deactive'}</td>
                          <td>{user.Assignto ? user.Assignto.DeveloperName : 'Not Assigned'}</td>
                          <td>
                            <div className="td-icons">
                                 <Link to={'/view/'+user._id}>
                                    <i className="fa fa-eye"></i>
                                  </Link>       
                                <Link to="">
                                <i className="fa fa-edit" onClick={() =>handleClick(user._id)}></i>
                              </Link>
                              <Link to="">
                                <i className="fa fa-trash" onClick={() =>handledelete(user._id)}></i>
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
      
      <AddUserModal
        isOpen={isModalOpen}
        onClose={closeModal}
        addUser={addUser}
        userData={userData}
        setFormData={setFormData}
        formData={formData}
        users={activePriority}
        developerList={activeDevelopers}
      />
    </>
  );
}

export default ProjectManagement;
