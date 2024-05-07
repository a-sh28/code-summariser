import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function InputCode() {
  const [files, setFiles] = useState([]);
  const [code, setCode] = useState(''); 
  const [summary, setSummary] = useState('');
  const [feedback, setFeedback] = useState({
    accuracy: '3',
    consistency: '',
    naturalness: '',
    usefulness: '',
    additional: ''
  });
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
    setMessage('');
    setSummary(''); 
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
        body: JSON.stringify(feedback)
      });
      const data = await response.json();
      alert('Feedback submitted successfully');
    } catch (error) {
      alert('Failed to submit feedback');
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      setMessage('Please select files before uploading.');
      return;
    }

    const formData = new FormData();
    files.forEach(file => formData.append('files[]', file));

    try {
      const response = await fetch('http://localhost:5000/api/uploadFiles', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload files.');
      }
      setSummary(data.summary || 'No summary available.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="col-12 d-flex flex-column p-4">
          <input
            type="file"
            onChange={handleFileChange}
            multiple
            className="form-control mb-2"
          />
          <button onClick={handleFileUpload} className="btn btn-primary mb-2">Upload Files</button>
          <textarea
            className="form-control mb-2"
            placeholder="Summary generated"
            value={summary}
            readOnly
          ></textarea>
          <div>
            <h4>FEEDBACK</h4>
            <form onSubmit={handleSubmitFeedback}>
              {Object.entries(feedback).map(([key, value]) => (
                <div className="form-group" key={key}>
                  <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                  {key === 'accuracy' ? (
                    <select className="form-control" name={key} value={value} onChange={handleFeedbackChange}>
                      {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}</option>)}
                    </select>
                  ) : (
                    <input type="text" className="form-control" name={key} value={value} onChange={handleFeedbackChange} />
                  )}
                </div>
              ))}
              <button type="submit" className="btn btn-primary">Submit Feedback</button>
            </form>
          </div>
          {message && <div className="alert alert-info">{message}</div>}
        </div>
      </div>
    </div>
  );
}

export default InputCode;
