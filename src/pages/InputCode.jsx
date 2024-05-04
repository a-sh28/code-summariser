import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

function InputCode() {
  const [singleFile, setSingleFile] = useState(null);
  const [multipleFiles, setMultipleFiles] = useState([]);

  const handleSingleFileChange = (e) => {
    setSingleFile(e.target.files[0]);
  };

  const handleMultipleFileChange = (e) => {
    setMultipleFiles(e.target.files);
  };

  const handleSubmitSingleFile = async () => {
    const formData = new FormData();
    formData.append('file', singleFile);

    try {
      const response = await fetch('http://localhost:5000/api/uploadSingleFile', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error uploading single file:', error);
    }
  };

  const handleSubmitMultipleFiles = async () => {
    const formData = new FormData();
    for (let file of multipleFiles) {
      formData.append('files', file);
    }

    try {
      const response = await fetch('http://localhost:5000/api/uploadMultipleFiles', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error uploading multiple files:', error);
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
                <Form.Group controlId="singleFile">
                  <Form.Label>Upload Single File</Form.Label>
                  <Form.Control type="file" onChange={handleSingleFileChange} />
                  <Button variant="primary" onClick={handleSubmitSingleFile}>Upload</Button>
                </Form.Group>
              </Form>
              <hr />
              <Form>
                <Form.Group controlId="multipleFiles">
                  <Form.Label>Upload Multiple Files</Form.Label>
                  <Form.Control type="file" multiple onChange={handleMultipleFileChange} />
                  <Button variant="primary" onClick={handleSubmitMultipleFiles}>Upload</Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default InputCode;
