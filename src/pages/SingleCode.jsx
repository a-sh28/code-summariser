import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function SingleCode() {
  const [code, setCode] = useState('');
  const [summary, setSummary] = useState('');
  const [feedback, setFeedback] = useState({
    accuracy: '3',
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
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="col-12 d-flex flex-column px-4">
          <textarea className="form-control my-2" placeholder="Input code" value={code} onChange={(e) => setCode(e.target.value)}></textarea>
          <button onClick={handleGenerateSummary} className="btn btn-primary mb-2">Generate Summary</button>
          <textarea className="form-control my-2" placeholder="Summary generated" value={summary} readOnly></textarea>
          <form onSubmit={handleSubmitFeedback} className="w-100">
            <h4>FEEDBACK</h4>
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
            <button type="submit" className="btn btn-primary">Submit Feedback</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SingleCode;
