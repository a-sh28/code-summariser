import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

function Translator() {
  const [summaryText, setSummaryText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [language, setLanguage] = useState('en'); // Default language to English

  const handleTranslate = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          summary: summaryText,
          targetLanguage: language
        })
      });
      const data = await response.json();
      setTranslatedText(data.translatedSummary);
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <h3 className="mb-4">Translate Code Summary</h3>
              <Form>
                <Form.Group controlId="summaryText">
                  <Form.Label>Enter Code Summary</Form.Label>
                  <Form.Control as="textarea" rows={5} value={summaryText} onChange={(e) => setSummaryText(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="language">
                  <Form.Label>Select Language</Form.Label>
                  <Form.Control as="select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                    {/* Add more languages as needed */}
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" onClick={handleTranslate}>Translate</Button>
              </Form>
              {translatedText && (
                <div className="mt-4">
                  <h5>Translated Text:</h5>
                  <p>{translatedText}</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Translator;
