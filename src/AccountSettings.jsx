import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

function AccountSettings() {
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  // Data mocked currently, must retrieve it from the sign in page 
  const [adminId, setAdminId] = useState(1);

  useEffect(() => {
    // Fetch user data from the server
    const fetchAdminData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/adminData?search=${adminId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch usernames');
        }
        const data = await response.json();
        console.log(data);
        setAdminUsername(data["admin_username"]);
        setAdminPassword(data["admin_password"]);
      } catch (error) {
        console.error('Error fetching usernames:', error);
      }
    };

    fetchAdminData(); // Fetch usernames on component mount
  }, []);

  return (
    <div>
      <Container>
      <Row className="d-flex justify-content-center align-items-center">
        <Col>
          <Card className="shadow"  style={{ width: '500px', height: '350px' }}>
          <Card.Header style={{backgroundColor: '#99CCFF'}}>
            <h3>Account Information</h3>
          </Card.Header>
            <Card.Body>
            <Form className="mb-2">
                    <Form.Group className="mb-2" controlId="adminName">
                      <Form.Label className="text-center">
                        Admin Name: 
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={adminUsername}
                        disabled={true}
                      />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="adminPassword">
                      <Form.Label className="text-center">
                        Admin Password:
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={adminPassword}
                        disabled={true}
                      />
                    </Form.Group>
                    <div className="d-grid">
                      <Button className="text-body" style={{margin: "5%",backgroundColor: "#0066CC",borderColor:"#00000"}}>
                        Change Password
                      </Button>
                    </div>
                  </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default AccountSettings;
