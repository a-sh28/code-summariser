import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Button, Row, Container, Card, Form , InputGroup} from "react-bootstrap";

function SingleCode() {
  const [code, setCode] = useState('');
  const [summary, setSummary] = useState('');
  const [feedback, setFeedback] = useState({
    accuracy: '',
    consistency: '',
    naturalness: '',
    usefulness: '',
    additional: ''
  });

  const handleGenerateSummary = () => {
    setSummary('Generated summary based on the code input.');
  };

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [name]: value
    }));
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/submitFeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...feedback, summary }) // Include summary in the feedback data
      });
      const data = await response.json();
      alert('Feedback submitted successfully');
    } catch (error) {
      alert('Failed to submit feedback');
    }
  };

  return (

    <div>
      <Container>
        <Row className="d-flex justify-content-center align-items-center">
          <Col>
            <Card className="shadow" style={{ width: '800px', height: '550px' }}>
              <Card.Header style={{ backgroundColor: '#99CCFF' }}>
                <h3>Code Summarization</h3>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                  <textarea className="form-control my-2" placeholder="Input code"  style={{ width: '350px', height: '250px' }} value={code} onChange={(e) => setCode(e.target.value)}></textarea>
                  <button onClick={handleGenerateSummary} style={{ backgroundColor: "#0066CC", borderColor: "#00000" }} className="btn btn-primary mb-2">Generate Summary</button>
                  <textarea className="form-control my-2" placeholder="Summary generated" value={summary}  style={{ width: '350px', height: '100px' }} readOnly></textarea>
                  </Col>
                  <Col>
                  <Card className="shadow" style={{ width: '310px', height: '440px' }}>
                  <Card.Header style={{backgroundColor: '#99CCFF'}}>
                  <h5>Feedback</h5>
                  </Card.Header>
                    <Card.Body>
                    <form onSubmit={handleSubmitFeedback} className="w-100">
                      {Object.entries(feedback).map(([key, value]) => (
                        <div className="form-group" key={key}>
                          <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                          {key === 'accuracy' ? (
                            <select className="form-control" name={key} value={value} onChange={handleFeedbackChange}>
                              {[1, 2, 3, 4, 5].map(num => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          ) : (
                            <input type="text" className="form-control" name={key} value={value} onChange={handleFeedbackChange} />
                          )}
                        </div>
                      ))}
                      <button type="submit" style={{ marginTop: "2%", backgroundColor: "#0066CC", borderColor: "#00000" }} className="btn btn-primary">Submit Feedback</button>
                    </form>

                    </Card.Body>
                  </Card>

                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SingleCode;
