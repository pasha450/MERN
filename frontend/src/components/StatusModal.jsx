import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

function StatusModal({ isOpen, onClose, formData, addUser, setFormData }) {
  const navigate = useNavigate();
  const [header, setHeader] = useState({});
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const token = Cookies.get('authToken');
    const loggedUserData = JSON.parse(localStorage.getItem('storeData'));
    const userId = loggedUserData.userId;
    const header = {
      Authorization: token,
    };
    setHeader(header);
    setUserId(userId);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Append form fields
    const formDataToSend = new FormData();
    formDataToSend.append('userId', formData.userId);
    formDataToSend.append('Name', formData.Name);
    formDataToSend.append('StatusChecked', formData.StatusChecked);

    try {
      let response;
      // Perform update if userId is present in formData
      if (formData.userId) {
        response = await axios.post(`${apiUrl}/priority/update`, formDataToSend, { headers: header });
      } else {
        response = await axios.post(`${apiUrl}/priority/store`, formDataToSend, { headers: header });
      }
      addUser(response.data);
      console.log(response.data);
      navigate(0); 

      // Reset form data after submission
      setFormData({
        userId: '',
        Name: '',
        StatusChecked: '',
      });
      onClose();
    } catch (error) {
      console.log('Error during submission:', error);
      onClose(); 
    }
  }

  return (
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
            <img src="/assests/images/red-flag-bg.svg" className="img-fluid w-25" alt="" />
            <h3>Flag Data</h3>
            <p>Please report the incorrect information</p>
          </div>
        </div>

        <form className="formarea" onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name='Name'
              placeholder="Enter your Name"
              value={formData.Name} 
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-4">
              <label>Status Checked</label>
              <select
              className="form-control"
              name="StatusChecked"
              value={formData.StatusChecked}
              onChange={handleChange}
              >
              <option value="">Select Status</option> 
              <option value="1">Active</option>
              <option value="2">Deactive</option>
              </select> 
            </div>


          <div className="col-md-12 text-center">
            <button
              className="login-btn"
              type="submit">Submit</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default StatusModal;
