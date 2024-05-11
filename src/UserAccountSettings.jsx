import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Button, Row, Container, Card, Form , InputGroup} from "react-bootstrap";
import { Eye, EyeSlash } from 'react-bootstrap-icons';

function UserAccountSettings() {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userId, setUserId] = useState(localStorage.getItem('userid'));
  const [showPassword, setShowPassword] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [cardWidth, setCardWidth] = useState('350px');

  

  const fetchUserData = async () => {
    try {
      setUserId(localStorage.getItem('userid'));
      console.log(userId);
      const response = await fetch(`http://127.0.0.1:5000/api/userData?search=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch usernames');
      }
      const data = await response.json();
      console.log(data);
      setUserName(data["user_username"]);
      setUserPassword(data["user_password"]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch usernames on component mount
  }, [userId]);

  const handleChangePasswordClick = () => {
    setShowChangePasswordForm(true);
    setCardWidth('850px');
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmitNewPassword = async (e) => {

    try {
       const response = await fetch(`http://127.0.0.1:5000/api/updateUserPassword`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           userId: userId,
           userPassword: newPassword
         })
       });
      if(response.ok)
        {
          window.alert("Password successfully changed!")
        }
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
       // Fetch user data again to update the UI
       fetchUserData();
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
                      <Form.Group className="mb-2" controlId="userName">
                        <Form.Label className="text-center">
                          UserName:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={userName}
                          disabled={true}
                        />
                      </Form.Group>
                      <Form.Group className="mb-2" controlId="userPassword">
                        <Form.Label className="text-center">
                          User Password:
                        </Form.Label>
                        <InputGroup>
                          <Form.Control
                            type={showPassword ? "userPassword" : "******"}
                            placeholder={showPassword ? userPassword : "******"}
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

export default UserAccountSettings;
