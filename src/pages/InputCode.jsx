import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

function InputCode() {
  const [codeFiles, setCodeFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    const newCodeFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (event) => {
        const codeContent = event.target.result;
        const summary = generateSummary(codeContent);
        newCodeFiles.push({ file, codeContent, summary, feedback: { accuracy: '', consistency: '', uniqueness: '', additional: '' } });

        if (newCodeFiles.length === files.length) {
          setCodeFiles(newCodeFiles);
        }
      };

      reader.readAsText(file);
    }
  };

  const generateSummary = (codeContent) => {
    // Add your code summarization logic here
    return "Summary for the code file";
  };

  const handleFeedbackChange = (index, feedbackType, value) => {
    const updatedCodeFiles = [...codeFiles];
    updatedCodeFiles[index].feedback[feedbackType] = value;
    setCodeFiles(updatedCodeFiles);
  };

  const handleSubmitFeedback = async (index) => {
    const codeFile = codeFiles[index];
    try {
      const response = await fetch('http://localhost:5000/api/submitFeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          codeFile
        })
      });
      const data = await response.json();
      console.log("Feedback submitted for code file:", data);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <h3 className="mb-4">Upload Code</h3>
              <Form>
                <Form.Group controlId="codeFiles">
                  <Form.Label>Upload Code Files</Form.Label>
                  <Form.Control type="file" multiple onChange={handleFileChange} />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {codeFiles.map((codeFile, index) => (
        <Row key={index} className="justify-content-center mt-3">
          <Col xs={12} md={10}>
            <Card>
              <Card.Body>
                <Row>
                  <Col xs={12} md={8}>
                    <h5 className="mb-3">{codeFile.file.name}</h5>
                    <p><strong>Summary:</strong></p>
                    <p>{codeFile.summary}</p>
                  </Col>
                  <Col xs={12} md={4}>
                    <Form.Group controlId={`accuracy_${index}`}>
                      <Form.Label>Accuracy:</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter accuracy"
                        value={codeFile.feedback.accuracy}
                        onChange={(e) => handleFeedbackChange(index, 'accuracy', e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId={`consistency_${index}`}>
                      <Form.Label>Consistency:</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter consistency"
                        value={codeFile.feedback.consistency}
                        onChange={(e) => handleFeedbackChange(index, 'consistency', e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId={`uniqueness_${index}`}>
                      <Form.Label>Uniqueness:</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter uniqueness"
                        value={codeFile.feedback.uniqueness}
                        onChange={(e) => handleFeedbackChange(index, 'uniqueness', e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId={`additional_${index}`}>
                      <Form.Label>Additional:</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter additional feedback"
                        value={codeFile.feedback.additional}
                        onChange={(e) => handleFeedbackChange(index, 'additional', e.target.value)}
                      />
                    </Form.Group>
                    <Button variant="primary" onClick={() => handleSubmitFeedback(index)}>Submit Feedback</Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </Container>
  );
}

export default InputCode;
