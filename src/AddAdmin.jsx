import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

function AddAdmin() {
  // State to manage form input values
  const [adminName, setAdminName] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  // Function to handle submit of add admin form
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send a POST request to your backend endpoint using fetch API
      const response = await fetch('http://127.0.0.1:5000/api/addAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          admin_username: adminName,
          admin_password: adminPassword
        })
      });

      // Handle success, log response, etc.
      const data = await response.json();
      console.log('Admin added:', data["new_admin"]);

      // Clear form fields after successful submission
      setAdminName('');
      setAdminPassword('');
    } catch (error) {
      // Handle errors, log, show error message to user, etc.
      console.error('Error adding admin:', error);
    }
  };
  return (
    <div>
      <Container>
        <Row className="d-flex justify-content-center align-items-center">
          <Col>
            <Card className="shadow"  style={{ width: '500px', height: '350px' }}>
              <Card.Header style={{backgroundColor: '#99CCFF'}}>
                <h3>Add Admin</h3>
              </Card.Header>
              <Card.Body>
                <div className="mb-2 mt-2">
                  <Form onSubmit={handleSubmit} className="mb-2">
                    <Form.Group className="mb-2" controlId="adminName">
                      <Form.Label className="text-center">
                        Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="adminPassword">
                      <Form.Label className="text-center">
                        Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                      />
                    </Form.Group>
                    <div className="d-grid">
                      <Button className="text-body" style={{margin: "5%",backgroundColor: "#0066CC",borderColor:"#00000"}} type="submit">
                        Add Administrator
                      </Button>
                    </div>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddAdmin;
