import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { Col, Row, Container, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function InputCode() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [verbalFeedback, setVerbalFeedback] = useState('');
  const [consistency, setConsistency] = useState(null);
  const [naturalness, setNaturalness] = useState(null);
  const [usefulness, setUsefulness] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleConsistencyChange = (e) => {
    setConsistency(parseInt(e.target.value));
  };
  
  const handleNaturalnessChange = (e) => {
    setNaturalness(parseInt(e.target.value));
  };
  
  const handleUsefulnessChange = (e) => {
    setUsefulness(parseInt(e.target.value));
  };
  
  const handleVerbalFeedbackChange = (e) => {
    setVerbalFeedback(e.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError('');  // Clear any existing errors
  };

  const generatesummary = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload a file to generate a summary.');
      return;
    }

    // Assuming the backend expects form-data for file upload
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/generatesummary', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setSummary(data.summary);
        console.log("Summary generated");
      }
    } catch (error) {
      console.log(error);
      setError('Failed to generate summary.');
    }
  };

  const submitfeedback = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload a file before submitting feedback.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/submitfeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ summary, verbalFeedback, consistency, naturalness, usefulness })
      });
      const data = await response.json();
      if (data.success) {
        window.alert("Feedback submitted successfully")
        console.log("Feedback submitted");
        window.location.href = "/userdashboard";
      }
    } catch (error) {
      console.log(error);
      setError('Failed to submit feedback.');
    }
  };

  return (
    <div>
      <Container>
        <Row className="d-flex justify-content-center align-items-center">
          <Col>
            <Card className="shadow" style={{ width: '930px', height: '480px' }}>
              <Card.Header style={{ backgroundColor: '#99CCFF' }}>
                <h3>Code Summarization</h3>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    <input type="file" onChange={handleFileChange} className="form-control my-2" />
                    <button onClick={generatesummary} style={{ backgroundColor: "#0066CC", borderColor: "#00000" }} className="btn btn-primary mb-2">Generate Summary</button>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <textarea className="form-control my-2" placeholder="Summary generated" value={summary} style={{ width: '500px', height: '150px' }} readOnly></textarea>
                  </Col>
                  <Col>
                    <Card className="shadow" style={{ width: '310px', height: '380px' }}>
                      <Card.Header style={{ backgroundColor: '#99CCFF' }}>
                        <h5>Feedback</h5>
                      </Card.Header>
                      <Card.Body>
                        <form onSubmit={submitfeedback} className="w-100">
                          <div className="form-group">
                            <label>Consistency:</label>
                            <select className="form-control" value={consistency || ''} onChange={handleConsistencyChange}>
                              <option value="">Select</option>
                              {[1, 2, 3, 4, 5].map(num => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Naturalness:</label>
                            <select className="form-control" value={naturalness || ''} onChange={handleNaturalnessChange}>
                              <option value="">Select</option>
                              {[1, 2, 3, 4, 5].map(num => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Usefulness:</label>
                            <select className="form-control" value={usefulness || ''} onChange={handleUsefulnessChange}>
                              <option value="">Select</option>
                              {[1, 2, 3, 4, 5].map(num => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Verbal Feedback:</label>
                            <textarea className="form-control" value={verbalFeedback} style={{ height: '60px' }} onChange={handleVerbalFeedbackChange}></textarea>
                          </div>
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

export default InputCode;
