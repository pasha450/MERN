import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { Card, Container, Row, Col, Badge } from "react-bootstrap";

const apiUrl = process.env.REACT_APP_API_URL;

function View() {
  const location = useLocation();
//   ## ## access the pass userdata via location --------------------------- or intialize to null 
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
      <Container className="mt-5">
        <h2 className="text-center mb-4">User Details</h2>
        {user ? (
          <Card className="shadow-lg">
            <Card.Body>
              <Row>
                <Col md={6}>
                  <p><strong>Project Name:</strong></p>
                  <h5>{user.ProjectName}</h5>
                </Col>
                <Col md={6}>
                  <p><strong>Status:</strong></p>
                  <h5>
                      {user.Status === 1 ? 'Active' : 'Deactive'}
                      
                  </h5>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col md={6}>
                  <p><strong>Assigned to:</strong></p>
                  <h5>{user.Assignto ? user.Assignto.DeveloperName : 'Not Assigned'}</h5>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ) : (
          <div className="text-center">
            <p>No user data available.</p>
          </div>
        )}
      </Container>
    );
  }
  
export default View;

