import React, { useState, useEffect } from 'react';
import { Col, Button, Row, Container, Card, Form, InputGroup } from "react-bootstrap";
import { Eye, EyeSlash } from 'react-bootstrap-icons';

function UserAccountSettings() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/userData`);
      const data = await response.json();
      setUsername(data.username);
      setPassword(data.password);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmitNewPassword = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/updatePassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newPassword })
      });
      if (!response.ok) {
        throw new Error('Failed to update password');
      }
      setNewPassword('');
      alert('Password updated successfully!');
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center">
        <Col>
          <Card className="shadow" style={{ width: '350px', height: '300px' }}>
            <Card.Header style={{ backgroundColor: '#99CCFF' }}>
              <h3>User Account Settings</h3>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type="text" placeholder={username} disabled />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password:</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled
                    />
                    <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeSlash /> : <Eye />}
                    </Button>
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="newPassword">
                  <Form.Label>New Password:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleSubmitNewPassword}>
                  Submit New Password
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UserAccountSettings;
