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
          <Card className="shadow"  style={{ width: '500px', height: '250px' }}>
          <Card.Header style={{backgroundColor: '#99CCFF'}}>
            <h3>Account Information</h3>
          </Card.Header>
            <Card.Body>
              <div className="mb-2 mt-2">
                Email Address: {adminEmail} {/* Display admin email */}
                <br />
                Password: {/* Display admin password */}
                <br />
                Role: Administrator
                <br />
                <div className="d-grid">
                  <Button class="text-body" style={{margin: "5%",backgroundColor: "#0066CC",borderColor:"#00000"}} type="submit">
                    Change Passowrd
                  </Button>
                </div>

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
