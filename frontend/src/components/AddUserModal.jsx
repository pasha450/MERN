import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

function AddUserModal({ isOpen, onClose, userToEdit, addUser, userData, setUserData }) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [header, setHeader] = useState({});
  const [formData, setFormData] = useState({
    ProjectName: '',
    Issue: '',
    Status: '',
    Description: '',
    Assignto: '',
  });

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

  // form submission *****
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (userToEdit) {
        response = await axios.post(`${apiUrl}/task/update`, formData, { headers: header });
      } else {
        response = await axios.post(`${apiUrl}/task/store`, formData, { headers: header });
      }
      addUser(response.data);
      navigate(0);
         
      setFormData({
        ProjectName: '',
        Issue: '',
        Status: '',
        Description: '',
        Assignto: '',
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
          <form className="formarea" onSubmit={handleSubmit}>
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
                type="Issue"
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
              <label>Status</label>
              <input
                type="text"
                className="form-control"
                name="Status"
                placeholder="Status"
                value={formData.Status}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-4">
              <label>Assign to</label>
              <input
                type="text"
                className="form-control"
                name="Assignto"
                placeholder="Enter the Developer name"
                value={formData.Assignto}
                onChange={handleChange}
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
