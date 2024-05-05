import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

function Translator() {
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [languageOptions, setLanguageOptions] = useState([
    { language: 'fr', name: 'French' },
    { language: 'es', name: 'Spanish' },
    { language: 'de', name: 'German' },
    { language: 'it', name: 'Italian' },
    { language: 'nl', name: 'Dutch' },
    { language: 'pt', name: 'Portuguese' },
  ]);

  const handleTranslate = async () => {
    if (originalText.length > 500) {
      alert('Maximum allowed characters exceeded (500 characters)');
      return;
    }
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(originalText)}&langpair=en|${targetLanguage}`);
      if (!response.ok) {
        throw new Error('Translation request failed');
      }
      const data = await response.json();
      setTranslatedText(data.responseData.translatedText);
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={8}>
          <Card>
            <Card.Body>
              <h3 className="mb-4">Translate Text</h3>
              <Form>
                <Form.Group controlId="originalText">
                  <Form.Label>Original Text</Form.Label>
                  <Form.Control as="textarea" rows={5} value={originalText} onChange={(e) => setOriginalText(e.target.value)} />
                </Form.Group>
                <Form.Group as={Row} controlId="targetLanguage">
                  <Form.Label column md={3}>Target Language</Form.Label>
                  <Col md={9}>
                    <Form.Control as="select" value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)} style={{ width: '100%' }}>
                      <option value="">Select Language</option>
                      {languageOptions.map((language, index) => (
                        <option key={index} value={language.language}>{language.name}</option>
                      ))}
                    </Form.Control>
                  </Col>
                </Form.Group>
                <Button variant="primary" onClick={handleTranslate} disabled={!targetLanguage}>Translate</Button>
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
