import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

function Feedback() {
  const [feedback, setFeedback] = useState({
    accuracy: '',
    consistency: '',
    usefulness: '',
    naturalness: ''
  });
  const [message, setMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedback)
      });
      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setMessage('Failed to submit feedback. Please try again.');
    }
  };

  // Function to handle form input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFeedback({ ...feedback, [name]: value });
  };

  return (
    <Card className="shadow" style={{ width: '500px', margin: 'auto' }}>
      <Card.Header style={{ backgroundColor: '#99CCFF' }}>
        <h5>Feedback</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="accuracy">
            <Form.Label>Accuracy</Form.Label>
            <Form.Control
              type="text"
              name="accuracy"
              value={feedback.accuracy}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="consistency">
            <Form.Label>Consistency</Form.Label>
            <Form.Control
              type="text"
              name="consistency"
              value={feedback.consistency}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="usefulness">
            <Form.Label>Usefulness</Form.Label>
            <Form.Control
              type="text"
              name="usefulness"
              value={feedback.usefulness}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="naturalness">
            <Form.Label>Naturalness</Form.Label>
            <Form.Control
              type="text"
              name="naturalness"
              value={feedback.naturalness}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit Feedback
          </Button>
        </Form>
        {message && <p className="mt-3">{message}</p>}
      </Card.Body>
    </Card>
  );
}

export default Feedback;
