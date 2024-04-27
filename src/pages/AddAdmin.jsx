import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

function AddAdmin() {
  // State to manage form input values
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminRole, setAdminRole] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can perform any actions like sending data to the server
    console.log('Submitted:', { adminName, adminEmail, adminRole });
    // Clear form fields after submission
    setAdminName('');
    setAdminEmail('');
    setAdminRole('');
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
                <Form className="mb-2">
                  <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label className="text-center">
                      Email address
                    </Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <div className="d-grid">
                    <Button class="text-body" style={{margin: "5%",backgroundColor: "#0066CC",borderColor:"#00000"}} type="submit">
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
