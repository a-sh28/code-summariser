import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Button, Row, Container, Card, Form , InputGroup} from "react-bootstrap";
import { Eye, EyeSlash } from 'react-bootstrap-icons';

function AccountSettings() {
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminId, setAdminId] = useState(localStorage.getItem('adminid'));
  const [showPassword, setShowPassword] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [cardWidth, setCardWidth] = useState('350px');

  const fetchAdminData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/adminData?search=${adminId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch usernames');
      }
      const data = await response.json();
      console.log(data);
      setAdminUsername(data["admin_username"]);
      setAdminPassword(data["admin_password"]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchAdminData(); // Fetch usernames on component mount
  }, [adminId]);

  const handleChangePasswordClick = () => {
    setShowChangePasswordForm(true);
    setCardWidth('850px');
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmitNewPassword = async (e) => {

    try {
       const response = await fetch(`http://localhost:5000/api/updateAdminPassword`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           adminId: adminId,
           newPassword: newPassword
         })
       });

       if (!response.ok) {
         throw new Error('Failed to update password');
        }
    }
    catch (error) {
      console.error('Error fetching usernames:', error);
    }


       // Clear the new password field
       setNewPassword('');
       // Hide the change password form
       setShowChangePasswordForm(false);
       // Fetch admin data again to update the UI
       fetchAdminData();
};

  return (
    <div>
      <Container>
        <Row className="d-flex justify-content-center align-items-center">
          <Col>
            <Card className="shadow" style={{ width: cardWidth, height: '350px' }}>
              <Card.Header style={{ backgroundColor: '#99CCFF' }}>
                <h3>Account Information</h3>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>
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
                        <InputGroup>
                          <Form.Control
                            type={showPassword ? "adminPassword" : "******"}
                            placeholder={showPassword ? adminPassword : "******"}
                            disabled={true}
                          />
                          <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                          </Button>
                        </InputGroup>
                      </Form.Group>
                      <div className="d-grid">
                        <Button className="text-body" style={{ margin: "5%", backgroundColor: "#0066CC", borderColor: "#00000" }} onClick={handleChangePasswordClick}>
                          Change Password
                        </Button>
                      </div>
                    </Form>
                  </Col>
                  {showChangePasswordForm && (
                  <Col>
                      <Form>
                        <Form.Group className="mb-2" controlId="newPassword">
                          <Form.Label>New Password:</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                          />
                        </Form.Group>
                        <div className="d-grid">
                        <Button className="text-body" style={{ margin: "5%", backgroundColor: "#0066CC", borderColor: "#00000" }}  onClick={handleSubmitNewPassword}>
                          Submit New Password
                        </Button>
                        </div>
                      </Form>
                  </Col>
                  )}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AccountSettings;
