import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

function AccountSettings() {
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  // useEffect(() => {
  //   // Fetch admin email and password from backend API
  //   axios.get('/admin')
  //     .then(response => {
  //       const { email, password } = response.data[0];
  //       setAdminEmail(email);
  //       setAdminPassword(password);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching admin data:', error);
  //     });
  //   }, []);

  return (
    <div>
      <Container>
      <Row className="d-flex justify-content-center align-items-center">
        <Col>
          <div className="border border-3 border-dark" ></div>
          <Card className="shadow px-5 py-3">
            <Card.Body>
              <div className="mb-2 mt-2">
                <h4 className="fw-bold mb-2 text-uppercase">Account Information</h4>
                Email Address: {adminEmail} {/* Display admin email */}
                <br />
                Password: {/* Display admin password */}
                <br />
                Role: Administrator
                <br />
                <Card.Text>
                  <a href="/change-password">Change Password</a> {/* Simple link to change password */}
                </Card.Text>

              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default AccountSettings;
