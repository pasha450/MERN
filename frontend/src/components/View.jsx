import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = process.env.REACT_APP_API_URL;

function View() {
  const location = useLocation();
//   ## ## access the pass userdata via location ---------------------------
  const [user, setUser] = useState(location.state?.user || null); 
  const { userId } = useParams();
  
 
  useEffect(() => {
    if (!user && userId) {
      const fetchUserData = async () => {
        try {
          const token = Cookies.get('authToken');
          const headers = {
            'Authorization': token
          };

          const response = await axios.post(`${apiUrl}/task/edit`, { userId }, { headers });
          setUser(response.data.userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [user,userId]);

  return (
    <>
      <h2>User Details</h2>
      {user ? (
        <div>
          <p><strong>Project Name:</strong> {user.ProjectName}</p>
          <p><strong>Status:</strong> {user.Status === 1 ? 'Active' : 'deactive'}</p>
          <p><strong>Assigned to:</strong> {user.Assignto ? user.Assignto.DeveloperName : 'Not Assigned'}</p>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </>
  );
}

export default View;

