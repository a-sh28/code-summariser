import React, { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';

function ViewSummaries() {
  const [summaries, setSummaries] = useState([]);
  const [cardWidth, setCardWidth] = useState('800px'); // Initial width
  const [userId, setUserId] = useState(localStorage.getItem('userid'));

  useEffect(() => {
    // Fetch summaries for the given user ID from the backend
    setUserId(localStorage.getItem('userid'));
    console.log(userId);
    async function fetchSummaries() {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/summaries?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch summaries');
        }
        const data = await response.json();
        setSummaries(data);
      } catch (error) {
        console.error('Error fetching summaries:', error);
      }
    }

    fetchSummaries();
  }, [userId]);

  useEffect(() => {
    // Adjust card width based on the number of summaries
    const numSummaries = summaries.length;
    const maxWidth = 800; // Maximum width for a single card
    const minWidth = 300; // Minimum width for a single card
    const calculatedWidth = Math.min(maxWidth, minWidth * numSummaries);
    setCardWidth(`${calculatedWidth}px`);
  }, [summaries]);

  return (
    <Container>
      <Card className="shadow" style={{ width: cardWidth }}>
        <Card.Header style={{ backgroundColor: '#99CCFF' }}>
          <h5>Summaries for User {userId}</h5>
        </Card.Header>
        <Card.Body style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {summaries.map((summary, index) => (
            <Card key={index} className="shadow" style={{ flex: '1 0 auto' }}>
              <Card.Body>
                <p>Summary: {summary.summary}</p>
                <p>Feedback: {summary.feedback}</p>
                <p>Naturalness: {summary.naturalness}</p>
                <p>Consistency: {summary.consistency}</p>
                <p>Usefulness: {summary.usefulness}</p>
              </Card.Body>
            </Card>
          ))}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ViewSummaries;
